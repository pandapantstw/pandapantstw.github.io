javascript:

if (typeof debug === 'undefined') debug = false;

function parseUrl() {
  var url = new Object();
  url.domain = window.location.href.match(/[a-z]+\d+.tribalwars.net/)[0];
  url.params = new Object();
  var raw = window.location.href.match(/[0-9a-z_\|]+=[0-9a-z_\|]+/g);
  for (var i in raw) {
    param = raw[i].split("=");
    url.params[param[0]] = param[1];
  }
  return url;
}
var url = parseUrl();

function getCookies() {
  var raw_list = document.cookie.split("; ");
  var cookies = new Object();
  for (i = 0; i < raw_list.length; i++) {
    var raw_split = raw_list[i].split("=");
    cookies[raw_split[0]] = raw_split[1];
  }
  return cookies;
}
var cookies = getCookies();

function setCookie(key, value) {
  document.cookie = key + "=" + value + ";expires=-1";
}

function goto(params) {
  var target = "https://" + url.domain + "/game.php?" + params;
  if (debug) console.log(target);
  else window.location.href = target;
}

function ensureUrl(params) {
  var raw = params.match(/[0-9a-z_]+=[0-9a-z_]+/g);
  var redirect = false;
  for (var i in raw) {
    param = raw[i].split("=");
    if (url.params[param[0]] != param[1]) redirect = true;
  }
  if (redirect) goto(params);
  return redirect;
}

void(0);
