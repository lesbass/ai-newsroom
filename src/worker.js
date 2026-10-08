const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]']);

const PAPERCLIP_PROVENANCE_PREFIX = '/paperclip/';
const PAPERCLIP_ORIGIN = 'https://paperclip.lesbass.com';

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
		return env.ASSETS.fetch(request);
	},
};
