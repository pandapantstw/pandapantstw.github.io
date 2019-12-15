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

function doMarket(){
  var wood = document.getElementById("wood").innerText;
  var clay = document.getElementById("stone").innerText;
  var iron = document.getElementById("iron").innerText;

  var merch = document.getElementById("market_merchant_available_count").innerText;
  if (merch == 0) {
    console.log("Done trading");
    return;
  }

  document.forms["own_offer_form"].sell.value=sell_amt;
  document.forms["own_offer_form"].buy.value=buy_amt;
  document.forms["own_offer_form"].multi.value = Math.ceil(merch / 2);
  document.forms["own_offer_form"].submit();
}

if (screen == "market" && mode == "own_offer") {
  doMarket();
} else {
  goto("screen=market&mode=own_offer");
}
