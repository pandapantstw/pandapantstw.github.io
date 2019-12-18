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
  var wood_available = document.getElementById("wood").innerText;
  var clay_available = document.getElementById("stone").innerText;
  var iron_available = document.getElementById("iron").innerText;

  var merch_available = document.getElementById("market_merchant_available_count").innerText;
  if (merch_available == 0) {
    console.log("Done trading");
    return;
  }
  
  var merch_used = 0;
  var wood_offered = 0;
  var clay_offered = 0;
  var iron_offered = 0;
  
  var offer_rows = window.top.$("#own_offers_table tr:not(:first-child):visible");
  for (i = 0; i < offer_rows.length - 1; i++) {
    var tds = offer_rows[i].getElementsByTagName("td");
    var offering = tds[1].getElementsByTagName("span")[1].getAttribute("title");
    var amt = parseInt(tds[1].innerText.replace(".", ""));
    if (offering == "Iron") iron_offered += amt;
    if (offering == "Clay") clay_offered += amt;
    if (offering == "Wood") wood_offered += amt;
  }

  document.forms["own_offer_form"].sell.value = sell_amt;
  document.forms["own_offer_form"].buy.value = buy_amt;
  document.forms["own_offer_form"].submit();
}

if (screen == "market" && mode == "own_offer") {
  doMarket();
} else {
  goto("screen=market&mode=own_offer");
}
