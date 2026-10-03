const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]']);

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.protocol === 'http:' && !LOCAL_HOSTNAMES.has(url.hostname)) {
			url.protocol = 'https:';
			return Response.redirect(url.href, 301);
		}
		return env.ASSETS.fetch(request);
	},
};
