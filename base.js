javascript:

if (typeof debug === 'undefined') debug = -1;

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
