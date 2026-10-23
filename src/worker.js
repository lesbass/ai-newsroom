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

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.protocol === 'http:' && !LOCAL_HOSTNAMES.has(url.hostname)) {
			url.protocol = 'https:';
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
		return env.ASSETS.fetch(request);
	},
};
