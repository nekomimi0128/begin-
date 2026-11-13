// Force HTTPS: redirect any http:// request to the same URL over https://.
// The decoy .env files get an explicit UTF-8 charset so the Japanese text
// at the end does not turn into mojibake in browsers.
// /wp-login.php serves a fake WordPress login page (this site does not run
// WordPress). Submitted passwords are compared in memory only against a
// list of classic overused passwords for the stage-2 joke; nothing is
// stored or logged. Only the attempt count is kept, in a cookie.
// /backup.sql is an endless fake database dump (a tarpit for scanners).
import { renderWpLogin, renderWpAdminLoading } from "./wp-login-page.js";

const ENV_PATHS = new Set(["/.env", "/app/.env", "/cmd/.env"]);

const CLASSIC_PASSWORDS = new Set([
  "admin", "password", "123456", "12345678", "123456789", "12345", "1234",
  "111111", "qwerty", "abc123", "password123", "admin123", "wordpress",
  "letmein", "root", "test", "passw0rd", "iloveyou", "master", "login",
]);

function parseAttempts(cookieHeader) {
  if (!cookieHeader) return 0;
  const m = cookieHeader.match(/(?:^|;\s*)wp_login_attempts=(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

async function handleWpLogin(request) {
  const attempts = parseAttempts(request.headers.get("Cookie"));
  if (request.method === "POST") {
    const n = attempts + 1;
    const cookie = `wp_login_attempts=${n}; Path=/; Max-Age=86400`;
    let pwd = "";
    try {
      const form = await request.formData();
      pwd = String(form.get("pwd") || "");
    } catch (e) {
      // Not a form submission; fall through to the normal error.
    }
    if (CLASSIC_PASSWORDS.has(pwd.trim().toLowerCase())) {
      return new Response(renderWpAdminLoading(pwd.trim()), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
          "Set-Cookie": cookie,
        },
      });
    }
    let msg = "ユーザー名またはパスワードが正しくありません。";
    if (n >= 3) {
      msg += `<br>（${n}回目ですね。正直にお伝えしますが、このサイトに WordPress は入っていません。何回試してもログインできません。ついでに言うと、このサーバーはティーポットです (418)）`;
    }
    return new Response(renderWpLogin(msg, true), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "Set-Cookie": cookie,
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

function fakeHash(n) {
  // Deterministic pseudo-random 53-char string that merely looks like a
  // bcrypt hash suffix. It is generated, never a real credential.
  const chars = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let x = (n * 2654435761) >>> 0;
  let out = "";
  for (let i = 0; i < 53; i++) {
    x = (x * 1103515245 + 12345) >>> 0;
    out += chars[(x >>> 16) % 64];
  }
  return out;
}

function handleBackupSql(request) {
  if (request.method === "HEAD") {
    return new Response(null, {
      headers: { "Content-Type": "application/octet-stream", "Cache-Control": "no-store" },
    });
  }
  const encoder = new TextEncoder();
  const tables = ["users", "posts", "orders"];
  let row = 0;
  let first = true;
  const stream = new ReadableStream({
    async pull(controller) {
      let chunk = "";
      if (first) {
        first = false;
        chunk += "-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)\n";
        chunk += "--\n-- Host: localhost    Database: portal_prod\n";
        chunk += "-- ------------------------------------------------------\n";
        chunk += "-- Server version\t8.0.36\n\n";
        chunk += "CREATE TABLE IF NOT EXISTS `users` (\n  `id` int NOT NULL,\n  `name` varchar(255) DEFAULT NULL,\n  `mail` varchar(255) DEFAULT NULL,\n  `pass` varchar(255) DEFAULT NULL,\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n";
      }
      for (let i = 0; i < 25; i++) {
        row++;
        if (row % 1000 === 1 && row > 1) {
          const t = tables[(row / 1000 | 0) % tables.length];
          chunk += `\n--\n-- Dumping data for table \`${t}\`\n--\n\n`;
        }
        const t = tables[(row / 1000 | 0) % tables.length];
        chunk += `INSERT INTO \`${t}\` VALUES (${row},'user_${row}','user${row}@example.com','$2y$10$${fakeHash(row)}','2024-01-01 00:00:00');\n`;
      }
      controller.enqueue(encoder.encode(chunk));
      // Slow drip: this is a tarpit, not a download service.
      await new Promise((r) => setTimeout(r, 400));
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": 'attachment; filename="backup.sql"',
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
    if (url.pathname === "/backup.sql") {
      return handleBackupSql(request);
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
