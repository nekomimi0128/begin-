// Force HTTPS: redirect any http:// request to the same URL over https://.
// Everything else is served from the static assets (including the 404 page).
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
