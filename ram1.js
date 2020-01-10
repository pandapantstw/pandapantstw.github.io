javascript:

var max_range = 15;
var world_url = "https://" + window.location.href.match(/[a-z]+\d+.tribalwars.net/)[0];
var screen = window.location.href.match(/screen=([a-z_]+)/)[1];
var screen_is_try_confirm = window.location.href.includes("try=confirm");
var village_xy = $("#menu_row2_village")[0].parentElement.innerText.match(/\d+\|\d+/)[0];

var wall_rams = [0,2,4,7,10,15,20,25,31,38,46];
var wall_axe = [0,20,50,50,50,50,50,100,100,100,200];

function attack_village() {
  var def_raw_village = document.getElementById('attack_info_def').rows[1].cells[1].firstChild.firstChild;
  var def_xy = def_raw_village.innerHTML.split("(")[1].split(")")[0];
  var building_levels = JSON.parse($('#attack_spy_building_data').val());
  var wall_level = 0;
  for (var i in building_levels) {
    if (building_levels[i].id == "wall") {
      wall_level = building_levels[i].level;
      break;
    }
  }
  window.location.href = world_url + "/game.php?screen=place&xy=" + def_xy + "&wall=" + wall_level;
}

function fill_units(xy) {
  var wall = window.location.href.match(/wall=([\d]+)/)[1];
  if (wall > wall_rams.length - 1) wall = wall_rams.length - 1;
  document.forms[0].input.value = xy;
  document.forms[0].spy.value = 1;
  document.forms[0].ram.value = wall_rams[wall];
  document.forms[0].axe.value = wall_axe[wall];
}

function sq_distance(a, b) {
  var as = a.split("|");
  var bs = b.split("|");
  return (as[0] - bs[0])*(as[0] - bs[0]) + (as[1] - bs[1])*(as[1] - bs[1]);
}

function setup_rams() {
  var village_list = window.top.$("#plunder_list tr:not(:first-child):visible");
  for (i = 1; i < village_list.length; i++) {
    var tds = village_list[i].getElementsByTagName("td");
    var xy = tds[3].innerHTML.split("(")[1].split(")")[0];
    var wall_level = tds[6].innerHTML;
    if (wall_level > 0 && sq_distance(village_xy, xy) <= max_range * max_range) {
      window.location.href = world_url + "/game.php?screen=place&xy=" + xy + "&wall=" + wall_level;
      return;
    }
  }
  console.log("Done ramming");
}

if (screen == "am_farm") {
  setup_rams();
} else if (screen == "report") {
  attack_village();
} else if (screen == "place") {
  if (!screen_is_try_confirm) {
    var xy = window.location.href.match(/xy=([|\d]+)/);
    if (xy == undefined) {
      window.location.href = world_url + "/game.php?screen=am_farm";
    } else {
      fill_units(xy[1]);
    }
  }
} else {
  console.log("No command for " + screen);
} 
