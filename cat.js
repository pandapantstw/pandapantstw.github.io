javascript:

var building_ids = ['main', 'barracks', 'stable', 'garage', 'church', 'church_f', 'snob', 'smith', 'place', 'statue', 'market', 'wood', 'stone', 'iron', 'farm', 'storage', 'hide', 'wall'];
var building_cats = [2,2,2,3,3,3,3,3,4,4,4,5,5,6,6,6,7,8,8,9];
var building_min = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function getCookie(key) {
  var raw_list = document.cookie.split("; ");
  for (i = 0; i < raw_list.length; i++) {
    var key_value = raw_list[i].split("=");
    if (key == key_value[0]) return key_value[1];
  }
}

function setCookie(key, value) {
  document.cookie = key + "=" + value + ";expires=-1";
}

var world_url = "https://en110.tribalwars.net";
var screen = window.location.href.match(/screen=([a-z]+)/)[1];

function scrape_report() {
  var def_raw_village = document.getElementById('attack_info_def').rows[1].cells[1].firstChild.firstChild;
  var def_xy = def_raw_village.innerHTML.split("(")[1].split(")")[0];
  
  var building_levels = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

  var building_data = JSON.parse($('#attack_spy_building_data').val());
  for (i = 0; i < building_data.length; i++) {
    var building = building_data[i];
    building_levels[building_ids.indexOf(building.id)] = Number(building.level);
  }
  return {def_xy : def_xy, building_levels : building_levels}
}

function setCatCookie(xy, buildings) {
  setCookie("cat", xy + "," + buildings.join(","));
}

if (screen == "report") {
  var scraping = scrape_report();
  setCatCookie(scraping.def_xy, scraping.building_levels);
  window.location.href = world_url + "/game.php?screen=place";
} else if (screen == "place") {
  var cat_cookie = getCookie("cat").split(",");
  var xy = cat_cookie[0];
  cat_cookie.shift();
  
  document.forms[0].spy.value = 1;
  document.forms[0].ram.value = 2;
  document.forms[0].axe.value = 50;
  document.forms[0].input.value = xy;
  document.forms[0].catapult.value = building_cats[cat_cookie[0] - 1];
}
