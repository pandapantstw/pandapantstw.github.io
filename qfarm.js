javascript:

// var min_lcs  = 7;
// var farm_list = ["500|500"];

var world_url = "https://en110.tribalwars.net";
var screen = window.location.href.match(/screen=([a-z_]+)/)[1];
var mode = window.location.href.match(/mode=([a-z_]+)/);
if (mode != null) mode = mode[1];
var screen_is_try_confirm = window.location.href.includes("try=confirm");

function goto(params) {
  window.location.href = world_url + "/game.php?" + params;
}

function getCookie(key) {
  var raw_list = document.cookie.split("; ");
  for (i = 0; i < raw_list.length; i++) {
    var key_value = raw_list[i].split("=");
    if (key == key_value[0]) return key_value[1];
  }
  return null;
}

function setCookie(key, value, hours) {
  var exp = Date.now() + hours * 60 * 60 * 1000;
  document.cookie = key + "=" + value + ";expires=" + exp;
}

function doAttack() {
  var total_lcs = $(":input[name=light]")[0].getAttribute("data-all-count");
  if (total_lcs < min_lcs) { 
    console.log("not enough lcs");
    return;
  }
  var scouts = $(":input[name=spy]")[0].getAttribute("data-all-count");
  var i = getCookie("qfarm_index");
  if (i == null) i = 0; 
  i = parseInt(i);
  if (i >= farm_list.length) i = 0;

  var num_attacks = farm_list.length - i;
  if (num_attacks > scouts) num_attacks = scouts;
  var lcs = total_lcs / num_attacks;
  if (lcs < min_lcs) lcs = min_lcs;
  lcs = parseInt(lcs);

  document.forms[0].spy.value = 1;
  document.forms[0].light.value = lcs;
  document.forms[0].input.value = farm_list[i];
  i++;
  if (i == farm_list.length) i = 0;
  setCookie("qfarm_index", i, 1);
}

if (screen == "place") {
  if (!screen_is_try_confirm) {
    doAttack();
  }
} else {
  goto("screen=place");
}
