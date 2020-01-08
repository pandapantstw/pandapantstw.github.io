javascript:

var sell_amt = 910;
var buy_amt = 1000;

var world_url = "https://en110.tribalwars.net";
var screen = window.location.href.match(/screen=([a-z_]+)/)[1];
var mode = window.location.href.match(/mode=([a-z_]+)/);
if (mode != null) mode = mode[1];

function goto(params) {
  window.location.href = world_url + "/game.php?" + params;
}

if (screen == "market" && mode == "mass_create_offers") {
  $("#offer_fill_button")[0].click();
  $(".btn_offer_create")[0].click();
} else {
  goto("screen=market&mode=mass_create_offers");
}
