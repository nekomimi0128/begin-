// Force HTTPS: redirect any http:// request to the same URL over https://.
// Everything else is served from the static assets (including the 404 page).
// The decoy .env files get an explicit UTF-8 charset so the Japanese text
// at the end does not turn into mojibake in browsers.
const ENV_PATHS = new Set(["/.env", "/app/.env", "/cmd/.env"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    const response = await env.ASSETS.fetch(request);
    if (ENV_PATHS.has(url.pathname)) {
      const fixed = new Response(response.body, response);
      fixed.headers.set("Content-Type", "text/plain; charset=utf-8");
      return fixed;
    }
    return response;
  },
};
