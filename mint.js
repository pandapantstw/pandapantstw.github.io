javascript:

var village_id = window.location.href.match(/village={0,1}(\d+)/)[1];

var world_url = "https://" + window.location.href.match(/[a-z]+\d+.tribalwars.net/)[0];
var screen = window.location.href.match(/screen=([a-z_]+)/)[1];
var screen_is_try_confirm = window.location.href.includes("try=confirm");
var mode = window.location.href.match(/mode=([a-z_]+)/);
if (mode != null) mode = mode[1];

function goto(params) {
  window.location.href = world_url + "/game.php?" + params;
}

function mint() {
  var clay_cost = parseInt($("#coin_cost_stone")[0].innerText.replace(".", ""));
  if (clay_cost > 0.75 * 30000) alert("Coins are too expensive here");
  $("#coin_mint_fill_max").click();
}

if (typeof mint_village === 'undefined') {
  var err = "var mint_village = " + village_id + ";";
  console.log(err);
  alert(err);
} else if (village_id == mint_village && screen == "snob" && mode == "train") {
  mint();
} else {
  goto("village=" + mint_village + "&screen=snob&mode=train");
} 
