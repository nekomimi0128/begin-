// Fake WordPress login page served at /wp-login.php.
// It is a visual replica for bot-trolling purposes only: this site does not
// run WordPress, no credentials are ever checked, stored or logged.
const PAGE = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ログイン &lsaquo; NekomimiPortal &#8212; WordPress</title>
<meta name="robots" content="noindex, nofollow">
<style>
  * { box-sizing: border-box; }
  body { background: #f0f0f1; color: #3c434a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; font-size: 14px; line-height: 1.4; margin: 0; }
  a { color: #50575e; text-decoration: none; }
  a:hover { color: #2271b1; }
  #login { width: 320px; margin: 0 auto; padding: 8% 0 0; }
  #login h1 { text-align: center; margin: 0 0 24px; padding: 0; }
  #login h1 a { display: inline-block; text-decoration: none; }
  #login form { background: #fff; border: 1px solid #c3c4c7; box-shadow: 0 1px 3px rgba(0,0,0,.04); padding: 26px 24px; margin: 0 0 20px; overflow: hidden; }
  #login label { display: block; margin: 0 0 3px; font-size: 14px; }
  #login .input { font-size: 24px; line-height: 1.333; width: 100%; padding: 3px 8px; margin: 2px 6px 16px 0; min-height: 40px; border: 1px solid #8c8f94; border-radius: 4px; background: #fff; color: #2c3338; }
  #login .input:focus { border-color: #2271b1; box-shadow: 0 0 0 1px #2271b1; outline: 2px solid transparent; }
  .wp-pwd { position: relative; display: block; }
  .wp-pwd .input { padding-right: 42px; margin-right: 0; }
  .wp-hide-pw { position: absolute; right: 0; top: 2px; width: 40px; height: 40px; background: transparent; border: none; color: #2271b1; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; }
  .wp-hide-pw svg { fill: #2271b1; display: block; }
  .forgetmenot { float: left; margin: 0; }
  .forgetmenot label { display: inline; font-size: 12px; }
  .submit { margin: 0; padding: 0; }
  .button-primary { float: right; background: #2271b1; border: 1px solid #2271b1; color: #fff; border-radius: 3px; padding: 0 12px; min-height: 32px; font-size: 13px; cursor: pointer; }
  .button-primary:hover { background: #135e96; border-color: #135e96; }
  #nav, #backtoblog { font-size: 13px; margin: 0 0 8px; padding: 0 24px; }
  #login_error { background: #fff; border: 1px solid #c3c4c7; border-left: 4px solid #d63638; box-shadow: 0 1px 1px rgba(0,0,0,.04); padding: 12px; margin: 0 0 20px; }
  .language-switcher { text-align: center; margin-top: 40px; }
  .language-switcher select { height: 30px; border: 1px solid #8c8f94; border-radius: 4px; background: #fff; color: #2c3338; }
  .language-switcher .button { background: #f6f7f7; border: 1px solid #2271b1; color: #2271b1; border-radius: 3px; min-height: 30px; padding: 0 10px; cursor: pointer; }
  @keyframes shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }
  .shake { animation: shake .82s cubic-bezier(.36,.07,.19,.97) both; }
</style>
</head>
<body class="login">
<div id="login"<!--SHAKE_CLASS-->>
  <h1><a href="https://ja.wordpress.org/" title="Powered by WordPress" tabindex="-1">
    <svg width="84" height="84" viewBox="0 0 64 64" aria-hidden="true"><path fill="#3c434a" d="M4.548 31.999c0 10.9 6.3 20.3 15.5 24.706L6.925 20.827C5.402 24.2 4.5 28 4.5 31.999z M50.531 30.614c0-3.394-1.219-5.742-2.264-7.57c-1.391-2.263-2.695-4.177-2.695-6.439c0-2.523 1.912-4.872 4.609-4.872 c0.121 0 0.2 0 0.4 0.022C45.653 7.3 39.1 4.5 32 4.548c-9.591 0-18.027 4.921-22.936 12.4 c0.645 0 1.3 0 1.8 0.033c2.871 0 7.316-0.349 7.316-0.349c1.479-0.086 1.7 2.1 0.2 2.3 c0 0-1.487 0.174-3.142 0.261l9.997 29.735l6.008-18.017l-4.276-11.718c-1.479-0.087-2.879-0.261-2.879-0.261 c-1.48-0.087-1.306-2.349 0.174-2.262c0 0 4.5 0.3 7.2 0.349c2.87 0 7.317-0.349 7.317-0.349 c1.479-0.086 1.7 2.1 0.2 2.262c0 0-1.489 0.174-3.142 0.261l9.92 29.508l2.739-9.148 C49.628 35.7 50.5 33 50.5 30.614z M32.481 34.4l-8.237 23.934c2.46 0.7 5.1 1.1 7.8 1.1 c3.197 0 6.262-0.552 9.116-1.556c-0.072-0.118-0.141-0.243-0.196-0.379L32.481 34.4z M56.088 18.8 c0.119 0.9 0.2 1.8 0.2 2.823c0 2.785-0.521 5.916-2.088 9.832l-8.385 24.242c8.161-4.758 13.65-13.6 13.65-23.728 C59.451 27.2 58.2 22.7 56.1 18.83z M32 0c-17.645 0-32 14.355-32 32C0 49.6 14.4 64 32 64s32-14.355 32-32.001 C64 14.4 49.6 0 32 0z M32 62.533c-16.835 0-30.533-13.698-30.533-30.534C1.467 15.2 15.2 1.5 32 1.5 s30.534 13.7 30.5 30.532C62.533 48.8 48.8 62.5 32 62.533z"/></svg>
  </a></h1>
<!--LOGIN_ERROR-->
  <form name="loginform" id="loginform" action="/wp-login.php" method="post">
    <p>
      <label for="user_login">ユーザー名またはメールアドレス</label>
      <input type="text" name="log" id="user_login" class="input" value="" size="20" autocapitalize="off" autocomplete="username">
    </p>
    <p>
      <label for="user_pass">パスワード</label>
      <span class="wp-pwd">
        <input type="password" name="pwd" id="user_pass" class="input password-input" value="" size="20" autocomplete="current-password" spellcheck="false">
        <button type="button" class="button button-secondary wp-hide-pw hide-if-no-js" data-toggle="0" aria-label="パスワードを表示">
          <span class="dashicons dashicons-visibility" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 4C5.2 4 1.9 9.6 1.7 10c.2.4 3.5 6 8.3 6s8.1-5.6 8.3-6C18.1 9.6 14.8 4 10 4zm0 10.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg></span>
        </button>
      </span>
    </p>
    <p class="forgetmenot">
      <input name="rememberme" type="checkbox" id="rememberme" value="forever">
      <label for="rememberme">ログイン状態を保存する</label>
    </p>
    <p class="submit">
      <input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large" value="ログイン">
      <input type="hidden" name="redirect_to" value="/wp-admin/">
      <input type="hidden" name="testcookie" value="1">
    </p>
  </form>
  <p id="nav"><a href="/wp-login.php?action=lostpassword">パスワードをお忘れですか？</a></p>
  <p id="backtoblog"><a href="/">&larr; NekomimiPortal に戻る</a></p>
  <div class="language-switcher">
    <form method="get">
      <label for="language-switcher-locales"><span aria-hidden="true">&#127760;</span> 言語</label>
      <select name="wp_lang" id="language-switcher-locales">
        <option value="en_US">English (United States)</option>
        <option value="ja" selected>日本語</option>
      </select>
      <input type="submit" class="button" value="変更">
    </form>
  </div>
</div>
<script>
  (function () {
    var btn = document.querySelector('.wp-hide-pw');
    var input = document.getElementById('user_pass');
    if (!btn || !input) return;
    btn.addEventListener('click', function () {
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('data-toggle', show ? '1' : '0');
      btn.setAttribute('aria-label', show ? 'パスワードを隠す' : 'パスワードを表示');
      btn.querySelector('svg').style.opacity = show ? '0.45' : '1';
      input.focus();
    });
  })();
</script>
</body>
</html>`;

export function renderWpLogin(errorMessage, shake) {
  const errorHtml = errorMessage
    ? `  <div id="login_error" class="notice notice-error"><strong>エラー</strong>: ${errorMessage}</div>`
    : "";
  return PAGE
    .replace("<!--LOGIN_ERROR-->", errorHtml)
    .replace("<!--SHAKE_CLASS-->", shake ? ' class="shake"' : "");
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Fake "login succeeded, loading the admin dashboard" page, shown only when
// a classic overused password is submitted. It loads forever, then reveals
// the joke after 12 seconds.
const LOADING = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ダッシュボード &lsaquo; NekomimiPortal &#8212; WordPress</title>
<meta name="robots" content="noindex, nofollow">
<style>
  * { box-sizing: border-box; }
  body { background: #f0f0f1; color: #3c434a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; font-size: 14px; line-height: 1.6; margin: 0; }
  .box { width: 420px; max-width: calc(100vw - 2rem); margin: 10vh auto 0; text-align: center; }
  .spinner { width: 42px; height: 42px; margin: 26px auto; border-radius: 50%; border: 4px solid #dcdcde; border-top-color: #2271b1; animation: spin 0.9s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  #taunt { display: none; background: #fff; border: 1px solid #c3c4c7; border-left: 4px solid #d63638; box-shadow: 0 1px 3px rgba(0,0,0,.04); padding: 18px 20px; text-align: left; margin-top: 24px; }
  #taunt .big { font-size: 16px; font-weight: 600; margin: 0 0 8px; }
  #taunt p { margin: 8px 0; }
  a { color: #2271b1; }
</style>
</head>
<body>
<div class="box">
  <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><path fill="#3c434a" d="M4.548 31.999c0 10.9 6.3 20.3 15.5 24.706L6.925 20.827C5.402 24.2 4.5 28 4.5 31.999z M50.531 30.614c0-3.394-1.219-5.742-2.264-7.57c-1.391-2.263-2.695-4.177-2.695-6.439c0-2.523 1.912-4.872 4.609-4.872 c0.121 0 0.2 0 0.4 0.022C45.653 7.3 39.1 4.5 32 4.548c-9.591 0-18.027 4.921-22.936 12.4 c0.645 0 1.3 0 1.8 0.033c2.871 0 7.316-0.349 7.316-0.349c1.479-0.086 1.7 2.1 0.2 2.3 c0 0-1.487 0.174-3.142 0.261l9.997 29.735l6.008-18.017l-4.276-11.718c-1.479-0.087-2.879-0.261-2.879-0.261 c-1.48-0.087-1.306-2.349 0.174-2.262c0 0 4.5 0.3 7.2 0.349c2.87 0 7.317-0.349 7.317-0.349 c1.479-0.086 1.7 2.1 0.2 2.262c0 0-1.489 0.174-3.142 0.261l9.92 29.508l2.739-9.148 C49.628 35.7 50.5 33 50.5 30.614z M32.481 34.4l-8.237 23.934c2.46 0.7 5.1 1.1 7.8 1.1 c3.197 0 6.262-0.552 9.116-1.556c-0.072-0.118-0.141-0.243-0.196-0.379L32.481 34.4z M56.088 18.8 c0.119 0.9 0.2 1.8 0.2 2.823c0 2.785-0.521 5.916-2.088 9.832l-8.385 24.242c8.161-4.758 13.65-13.6 13.65-23.728 C59.451 27.2 58.2 22.7 56.1 18.83z M32 0c-17.645 0-32 14.355-32 32C0 49.6 14.4 64 32 64s32-14.355 32-32.001 C64 14.4 49.6 0 32 0z M32 62.533c-16.835 0-30.533-13.698-30.533-30.534C1.467 15.2 15.2 1.5 32 1.5 s30.534 13.7 30.5 30.532C62.533 48.8 48.8 62.5 32 62.533z"/></svg>
  <div id="loading">
    <div class="spinner"></div>
    <p>認証に成功しました。<br>管理画面を読み込み中…</p>
  </div>
  <div id="taunt">
    <p class="big">12秒お待ちいただきましたが、管理画面は開きません。</p>
    <p>このサイトに WordPress は入っていないので、管理画面も存在しません。「ログイン成功」も演出です。</p>
    <p>そしてパスワード「<!--PWD-->」は、世界で最も使われるパスワードの常連です。本物のサイトでこれを使っていたら、とっくに乗っ取られています。</p>
    <p>スキャンご苦労さまでした。私はティーポットです (418)。</p>
    <p><a href="/">&larr; トップページへ戻る</a></p>
  </div>
</div>
<script>
  setTimeout(function () {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('taunt').style.display = 'block';
  }, 12000);
</script>
</body>
</html>`;

export function renderWpAdminLoading(pwd) {
  const shown = escapeHtml(String(pwd || "").slice(0, 40));
  return LOADING.replace("<!--PWD-->", () => shown);
}
