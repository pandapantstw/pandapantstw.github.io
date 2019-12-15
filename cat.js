javascript:

var building_ids = ['main', 'barracks', 'stable', 'garage', 'church', 'church_f', 'snob', 'smith', 'place', 'statue', 'market', 'wood', 'stone', 'iron', 'farm', 'storage', 'hide', 'wall'];
var building_cats = [2,2,2,3,3,3,3,3,4,4,4,5,5,6,6,6,7,8,8,9];
var building_min = [1,0,0,0,0,0,0,0,1,0,0,30,30,30,0,30,10,0];

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
var screen_is_try_confirm = window.location.href.includes("try=confirm");

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

function getCatCookie() {
  var cat_cookie = getCookie("cat").split(",");
  console.log(cat_cookie);
  var xy = cat_cookie[0];
  cat_cookie.shift();
  return {xy : xy, building_levels : cat_cookie}
}

function getCatIndex(building_levels) {
  var cat_index = 0;
  while (cat_index < building_levels.length && building_levels[cat_index] <= building_min[cat_index]) {
    cat_index++;
  }
  return cat_index;
}

function fillCats() {
  var cat_cookie = getCatCookie();
  var xy = cat_cookie.xy;
  var building_levels = cat_cookie.building_levels;
  
  var cat_index = getCatIndex(building_levels);
  
  if (cat_index == building_levels.length) {
    console.log("Done catting");
    return;
  }
  
  console.log("Catting " + building_ids[cat_index]);
  
  var num_cats = building_cats[building_levels[cat_index] - 1];
  var max_cats = document.forms[0].catapult.outerHTML.match(/data-all-count="(\d+)"/)[1];
  if (max_cats < 2*num_cats) document.forms[0].spy.value = 1;
  document.forms[0].axe.value = 50;
  document.forms[0].input.value = xy;
  document.forms[0].catapult.value = num_cats;
}

function selectCatAndUpdateCookie() {
  var cat_cookie = getCatCookie();
  console.log(cat_cookie.building_levels);
  var xy = cat_cookie.xy;
  var building_levels = cat_cookie.building_levels;
  
  var cat_index = getCatIndex(building_levels);
  
  if (cat_index == cat_cookie.length) {
    console.log("Done catting");
    return;
  }
  
  var options = document.forms[0].building.options;
  for (i = 0; i < options.length; i++) {
    console.log(options[i].value);
    if (building_ids[cat_index] == options[i].value) {
      document.forms[0].building.selectedIndex = i;
      break;
    }
  }
  building_levels[cat_index]--;
  setCatCookie(xy, building_levels);
}

if (screen == "report") {
  var scraping = scrape_report();
  setCatCookie(scraping.def_xy, scraping.building_levels);
  window.location.href = world_url + "/game.php?screen=place";
} else if (screen == "place") {
  if (screen_is_try_confirm) {
    selectCatAndUpdateCookie();
  } else {
    fillCats();
  }
} else {
  console.log("No command for " + screen);
}
