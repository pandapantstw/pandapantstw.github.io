javascript:

var num_axe = 20;
var building_ids = ['main', 'barracks', 'stable', 'garage', 'church', 'church_f', 'snob', 'smith', 'place', 'statue', 'market', 'wood', 'stone', 'iron', 'farm', 'storage', 'hide', 'wall'];
var building_cats = [2,2,2,3,3,3,3,3,4,4,4,5,5,6,6,6,7,8,8,9,10,10,11,12,13,15,16,17,19,20];
var building_min = [1,0,0,0,0,0,0,0,1,0,0,30,30,30,1,30,10,0];

function distance_sq(a, b) {
  ax = Math.floor(a / 1000);
  ay = a - ax * 1000;
  bx = Math.floor(b / 1000);
  by = b - bx * 1000;
  return (ax - bx)*(ax - bx) + (ay - by)*(ay - by);
}

function nextBarb(villages) {
  for (v in villages) {
    if (villages[v].owner != 0) continue;
    if (cookies.cat_blacklist.includes(villages[v].xy)) continue;
    return villages[v];
  }
  return undefined;
}

function doMap() {
  var village_xy = parseInt($("#menu_row2_village")[0].parentElement.innerText.match(/\d+\|\d+/)[0].replace("|", ""));
  var villages = [];
  for (v in TWMap.villages) {
    villages = villages.concat(TWMap.villages[v]);
  }

  villages.sort(
    function(a, b) {
      return distance_sq(a.xy, village_xy) - distance_sq(b.xy, village_xy); 
    }
  );
  
  var target = nextBarb(villages);
  goto("screen=info_village&id=" + target.id);
}

function blacklistVilla(xy) {
  xy = xy.replace("|", "");
  if (cookies.cat_blacklist == undefined) cookies.cat_blacklist = "";
  if (cookies.cat_blacklist.includes(xy)) return;
  setCookie("cat_blacklist", xy + "," + cookies.cat_blacklist);
}

function doVillage() {
  var reportList = $("#report_table tr:not(:first-child)");
  if (reportList.length == 0) {
    blacklistVilla("todo");
    return;
  }
  var reportHtml = reportList[0].innerHTML;
  var reportId = reportHtml.match(/view=(\d+)/)[1];
  goto("screen=report&mode=all&view=" + reportId);
}

function scrapeReport() {
  var def_xy = $("#attack_info_def")[0].innerHTML.match(/(\d+\|\d+)/)[1];
  var building_levels = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

  var building_data = JSON.parse($('#attack_spy_building_data').val());
  for (i = 0; i < building_data.length; i++) {
    var building = building_data[i];
    building_levels[building_ids.indexOf(building.id)] = Number(building.level);
  }
  return {def_xy : def_xy, building_levels : building_levels}
}

function getCatIndex(building_levels) {
  var max_index = -1;
  var max_level = 0;
  for (var i = 0; i < building_levels.length; i++) { 
    if (building_levels[i] <= building_min[i]) continue;
    if (building_levels[i] <= max_level) continue;
    max_level = building_levels[i];
    max_index = i;
  }
  return max_index;
}

function setCatCookie(xy, buildings) {
  setCookie("cat", xy + "," + buildings.join(","));
}

function getCatCookie() {
  var cat_cookie = cookies.cat.split(",");
  var xy = cat_cookie[0];
  cat_cookie.shift();
  return {xy : xy, building_levels : cat_cookie}
}

function doReport() {
  var scraping = scrapeReport();
  
  var cat_index = getCatIndex(scraping.building_levels);
  if (cat_index == -1) {
    blacklistVilla(scraping.xy);
    return;
  }
  
  setCatCookie(scraping.def_xy, scraping.building_levels);
  goto("screen=place");
}

function doPlace() {
  var cat_cookie = getCatCookie();
  var xy = cat_cookie.xy;
  var building_levels = cat_cookie.building_levels;
  
  var cat_index = getCatIndex(building_levels);
  if (cat_index == -1) {
    blacklistVilla(xy);
    goto("screen=map");
    return;
  }
  
  console.log("Catting level " + building_levels[cat_index] + " " + building_ids[cat_index]);
  
  var num_cats = building_cats[building_levels[cat_index] - 1];
  var max_cats = document.forms[0].catapult.outerHTML.match(/data-all-count="(\d+)"/)[1];
  var spy = 0;
  if (max_cats < 2*num_cats) {
    spy = 1;
  }
  building_levels[cat_index]--;
  if (getCatIndex(building_levels) == -1) {
    spy = 1;
  }
  
  if (spy > 0) document.forms[0].spy.value = spy;
  document.forms[0].axe.value = num_axe;
  document.forms[0].input.value = xy;
  document.forms[0].catapult.value = num_cats;
}

function selectCatAndUpdateCookie() {
  var cat_cookie = getCatCookie();
  console.log(cat_cookie.building_levels);
  var xy = cat_cookie.xy;
  var building_levels = cat_cookie.building_levels;
  
  var cat_index = getCatIndex(building_levels);
  if (cat_index == -1) {
    console.log("Done catting");
    return;
  }
  
  var options = document.forms[0].building.options;
  for (i = 0; i < options.length; i++) {
    if (building_ids[cat_index] == options[i].value) {
      document.forms[0].building.selectedIndex = i;
      break;
    }
  }
  building_levels[cat_index]--;
  setCatCookie(xy, building_levels);
}

function main() {
  if (url.params.screen == "map") {
    doMap();
  } else if (url.params.screen == "info_village") {
    doVillage();
  } else if (url.params.screen == "report") {
    doReport();
  } else if (url.params.screen == "place") {
    if (url.params.try != "confirm") {
      doPlace();
    } else {
      selectCatAndUpdateCookie();
    }
  } else {
    goto("screen=map");
  }

}

$.get('https://pandapantstw.github.io/base.js', main);
void(0);
