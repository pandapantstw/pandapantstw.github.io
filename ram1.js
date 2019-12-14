javascript:

var world_url = "https://en110.tribalwars.net";
var screen = window.location.href.match(/screen=([a-z]+)/)[1];

function attack_village() {
  var defender_raw_village = document.getElementById('attack_info_def').rows[1].cells[1].firstChild.firstChild;
  var defender_village_id = defender_raw_village.href.match(/&id=([0-9]+)/)[1];
  var attacker_raw_village = document.getElementById('attack_info_att').rows[1].cells[1].firstChild.firstChild;
  var attacker_village_id = defender_raw_village.href.match(/&id=([0-9]+)/)[1];
  window.location.href = world_url + "/game.php?village=" + attacker_village_id + "&screen=place&target=" + defender_village_id;
}

function fill_units() {
  document.forms[0].spy.value = 1;
  document.forms[0].ram.value = 4;
  document.forms[0].axe.value = 50;
}

if (screen == "report") {
  attack_village();
} else {
  fill_units();
}
