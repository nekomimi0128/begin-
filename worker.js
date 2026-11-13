// Force HTTPS: redirect any http:// request to the same URL over https://.
// The decoy .env files get an explicit UTF-8 charset so the Japanese text
// at the end does not turn into mojibake in browsers.
// /wp-login.php serves a fake WordPress login page (this site does not run
// WordPress). Submitted credentials are never read, checked or stored;
// only the number of attempts is kept in a cookie for the running joke.
import { renderWpLogin } from "./wp-login-page.js";

const ENV_PATHS = new Set(["/.env", "/app/.env", "/cmd/.env"]);

function parseAttempts(cookieHeader) {
  if (!cookieHeader) return 0;
  const m = cookieHeader.match(/(?:^|;\s*)wp_login_attempts=(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function handleWpLogin(request) {
  const attempts = parseAttempts(request.headers.get("Cookie"));
  if (request.method === "POST") {
    const n = attempts + 1;
    let msg = "ユーザー名またはパスワードが正しくありません。";
    if (n >= 3) {
      msg += `<br>（${n}回目ですね。正直にお伝えしますが、このサイトに WordPress は入っていません。何回試してもログインできません。ついでに言うと、このサーバーはティーポットです (418)）`;
    }
    return new Response(renderWpLogin(msg, true), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "Set-Cookie": `wp_login_attempts=${n}; Path=/; Max-Age=86400`,
      },
    });
  }
  return new Response(renderWpLogin(null, false), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === "/wp-admin" || url.pathname.startsWith("/wp-admin/")) {
      const to = new URL("/wp-login.php", url);
      to.searchParams.set("redirect_to", url.pathname);
      return Response.redirect(to.toString(), 302);
    }
    if (url.pathname === "/wp-login.php") {
      return handleWpLogin(request);
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
