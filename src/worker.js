const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]']);

const PAPERCLIP_PROVENANCE_PREFIX = '/paperclip/';
const PAPERCLIP_ORIGIN = 'https://paperclip.lesbass.com';

// A request is a page route when it does not already end in `/` and its final
// path segment has no dot. Files always carry an extension (`/rss.xml`,
// `/logo.png`, `/_astro/app.css`), so this never rewrites an asset request.
function isPageRoute(pathname) {
	if (pathname.endsWith('/')) return false;
	const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1);
	return lastSegment.length > 0 && !lastSegment.includes('.');
}

// Requests that still carry duplicate slashes or an explicit `/index.html`
// reach the ASSETS binding and get a 307 (temporary) redirect. Return the
// canonical directory path so the Worker can answer with a 301 instead.
function canonicalPagePath(pathname) {
	const collapsed = pathname.replace(/\/{2,}/g, '/').replace(/\/index\.html$/i, '/');
	return collapsed === pathname ? null : collapsed;
}

// Cloudflare `_redirects` destinations are written without the trailing slash
// (`/tags/security`), so following one costs a second hop through the Worker's
// slashless-page 301. Rewrite same-origin page destinations to their canonical
// form in a single hop. External and file destinations are left untouched.
function canonicalRedirectLocation(response, requestUrl) {
	if (response.status !== 301) return null;
	const location = response.headers.get('location');
	if (!location) return null;
	let target;
	try {
		target = new URL(location, requestUrl);
	} catch {
		return null;
	}
	if (target.origin !== requestUrl.origin || target.pathname.endsWith('/')) return null;
	const lastSegment = target.pathname.slice(target.pathname.lastIndexOf('/') + 1);
	if (!lastSegment || lastSegment.includes('.')) return null;
	target.pathname = `${target.pathname}/`;
	return target.href;
}

// The Worker also answers on its `*.workers.dev` deployment hostname. That host
// serves the same pages as the canonical domain but is not part of the public
// site, so keep it out of search indexes: without this, crawlers can discover
// and rank a duplicate copy of every article on the workers.dev subdomain.
function isAliasHost(hostname) {
	return hostname.endsWith('.workers.dev');
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.protocol === 'http:' && !LOCAL_HOSTNAMES.has(url.hostname)) {
			url.protocol = 'https:';
			return Response.redirect(url.href, 301);
		}
		// `/index.html` and paths with duplicate slashes are duplicate copies of
		// a directory URL. The ASSETS binding would answer them with a temporary
		// 307, so emit a permanent 301 to the canonical path instead.
		const canonicalPath = canonicalPagePath(url.pathname);
		if (canonicalPath) {
			url.pathname = canonicalPath;
			return Response.redirect(url.href, 301);
		}
		// Legacy provenance links (/paperclip/AIN-###) were never routes on the news
		// site and previously 404'd. 301 them to the public Paperclip issue page.
		if (url.pathname.startsWith(PAPERCLIP_PROVENANCE_PREFIX)) {
			const issue = url.pathname.slice(PAPERCLIP_PROVENANCE_PREFIX.length).replace(/\/+$/, '');
			if (issue) {
				const target = new URL(`${PAPERCLIP_ORIGIN}/AIN/issues/${issue}`);
				target.search = url.search;
				return Response.redirect(target.href, 301);
			}
		}
		// Every page route is a directory with an index.html, so its canonical
		// URL ends in `/`. Cloudflare's asset handler answers the slashless form
		// with a 307 (temporary) redirect, which search engines treat as
		// non-authoritative. Emit a 301 (permanent) instead so the canonical form
		// consolidates. A final path segment containing a dot is a file (feeds,
		// images, `_astro` assets, robots.txt) and is served untouched.
		if (isPageRoute(url.pathname)) {
			url.pathname += '/';
			return Response.redirect(url.href, 301);
		}
		const response = await env.ASSETS.fetch(request);
		const aliasHost = isAliasHost(url.hostname);
		const redirectLocation = canonicalRedirectLocation(response, url);
		// Clean URLs (`/`, `/articles/`, `/tags/<slug>/`) map to `index.html`
		// internally, so they never match the `/*.html` rule in public/_headers.
		// Apply the same 5-minute HTML cache here; assets keep their own rules.
		const cacheHtml =
			response.status === 200 &&
			/^text\/html\b/i.test(response.headers.get('content-type') || '');
		if (!aliasHost && !cacheHtml && !redirectLocation) return response;
		const headers = new Headers(response.headers);
		if (redirectLocation) headers.set('Location', redirectLocation);
		if (cacheHtml) headers.set('Cache-Control', 'public, max-age=300, must-revalidate');
		if (aliasHost) headers.set('X-Robots-Tag', 'noindex');
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	},
};
