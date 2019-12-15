javascript:

var world_url = "https://en110.tribalwars.net";
var screen = window.location.href.match(/screen=([a-z_]+)/)[1];

var wall_rams = [2,4,5,10,14,19];

function attack_village() {
  var defender_raw_village = document.getElementById('attack_info_def').rows[1].cells[1].firstChild.firstChild;
  var defender_village_id = defender_raw_village.href.match(/&id=([0-9]+)/)[1];
  var attacker_raw_village = document.getElementById('attack_info_att').rows[1].cells[1].firstChild.firstChild;
  var attacker_village_id = defender_raw_village.href.match(/&id=([0-9]+)/)[1];
  window.location.href = world_url + "/game.php?village=" + attacker_village_id + "&screen=place&target=" + defender_village_id;
}

function fill_units() {
  var xy = window.location.href.match(/xy=([|\d]+)/)[1];
  var wall = window.location.href.match(/wall=([\d]+)/)[1];
  if (wall > wall_rams.length - 1) wall = wall_rams.length - 1;
  document.forms[0].input.value = xy;
  document.forms[0].spy.value = 1;
  document.forms[0].ram.value = wall_rams[wall];
  document.forms[0].axe.value = 50;
}



if (screen == "am_farm") {
  var village_list = window.top.$("#plunder_list tr:not(:first-child):visible");
  console.log("length ="+village_list.length);
  for (i = 1; i < village_list.length; i++) {
    var tds = village_list[i].getElementsByTagName("td");
    var xy = tds[3].innerHTML.split("(")[1].split(")")[0];
    var wall_level = tds[6].innerHTML;
    if (wall_level > 0)
      window.location.href = world_url + "/game.php?screen=place&xy=" + xy + "&wall=" + wall_level;
  }
} else if (screen == "report") {
  attack_village();
} else if (screen == "place") {
  fill_units();
} else {
  console.log("No command for " + screen);
}
