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
    <svg width="84" height="84" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" fill="none" stroke="#3c434a" stroke-width="3.5"/><text x="50" y="70" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="bold" font-size="52" fill="#3c434a">W</text></svg>
  </a></h1>
<!--LOGIN_ERROR-->
  <form name="loginform" id="loginform" action="/wp-login.php" method="post">
    <p>
      <label for="user_login">ユーザー名またはメールアドレス</label>
      <input type="text" name="log" id="user_login" class="input" value="" size="20" autocapitalize="off" autocomplete="username">
    </p>
    <p>
      <label for="user_pass">パスワード</label>
      <input type="password" name="pwd" id="user_pass" class="input password-input" value="" size="20" autocomplete="current-password">
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
