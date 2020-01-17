javascript:

if (typeof group_id === 'undefined') group_id = -1;

var max_range = 15;
var world_url = "https://" + window.location.href.match(/[a-z]+\d+.tribalwars.net/)[0];
var screen = window.location.href.match(/screen=([a-z_]+)/);
if (screen != null) screen = screen[1];
var screen_is_try_confirm = window.location.href.includes("try=confirm");
var mode = window.location.href.match(/mode=([a-z_]+)/);
if (mode != null) mode = mode[1];
var village_xy = $("#menu_row2_village")[0].parentElement.innerText.match(/\d+\|\d+/)[0];

var wall_rams = [0,2,4,7,10,15,20,25,31,38,46];
var wall_axe = [0,20,50,50,50,50,50,100,100,100,200];

function getCookie(key) {
  var raw_list = document.cookie.split("; ");
  for (i = 0; i < raw_list.length; i++) {
    var key_value = raw_list[i].split("=");
    if (key == key_value[0]) return key_value[1];
  }
  return null;
}

function setCookie(key, value, hours) {
  var exp = Date.now() + hours * 60 * 60 * 1000;
  document.cookie = key + "=" + value + ";expires=" + exp;
}

function goto(params) {
  console.log(window.location.href = world_url + "/game.php?" + params);
}

function next_village() {
  window.location.href = $("#village_switch_right")[0].href;
}

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
  goto("screen=place&xy=" + def_xy + "&wall=" + wall_level);
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
  next_village();
}

function parseOverview() {
  var cookie = "";
  var village_list = $("#combined_table tr:not(:first-child)");
  if (village_list.length == 0) return;
  for (i = 0; i < village_list.length; i++) {
    var tds = village_list[i].getElementsByTagName("td");
    var troops = Array.from(tds).slice(8,tds.length-2).map(function (o) { return parseInt(o.innerText);});
    var rams = troops[8];
    var coords = tds[1].innerText.match(/\d+\|\d+/)[0];
    var village_id = tds[1].innerHTML.match(/village=(\d+)/)[1];
    var cookie = cookie + coords + "|" + village_id + "|" + rams + ",";
  }
  cookie = cookie.substring(0, cookie.length - 1);
  setCookie("ram2_src", cookie, 1);
}
function parseWalls() {
  var cookie = "";
  var village_list = window.top.$("#plunder_list tr:not(:first-child):visible");
  if (village_list.length == 0) return;
  for (i = 1; i < village_list.length; i++) {
    var tds = village_list[i].getElementsByTagName("td");
    var coords = tds[3].innerText.match(/\((\d+\|\d+)\)/)[1];
    var wall = parseInt(tds[6].innerText);
    if (wall > 0) cookie = cookie + coords + "|" + wall + ",";
  }
  cookie = cookie.substring(0, cookie.length - 1);
  setCookie("ram2_dst", cookie, 1);
}
function attackNext() {
  var cookie = getCookie("ram2_dst");
  var target_list = cookie.split(",");
  if (target_list.length == 0) {
    console.log("no targets");
    return;
  }
  target = target_list[0].split("|");
  var wall = parseInt(target[2]);
  var target_xy = target[0] + "|" + target[1];
  
  cookie = getCookie("ram2_src");
  var srcs = cookie.split(",");
  if (srcs.length == 0) {
    console.log("no sources");
    return;
  }
  var chosen_src_id = 0;
  var chosen_distance_sq = max_range*max_range + 1;
  for(var i = 0; i < srcs.length; i++) {
    var src = srcs[i].split("|");
    var src_xy = src[0] + "|" + src[1];
    var src_id = src[2];
    var src_rams = parseInt(src[3]);
    var src_distance_sq = sq_distance(src_xy, target_xy);
    if (wall_rams[wall] > src_rams) continue;
    if (src_distance_sq > chosen_distance_sq) continue;
    chosen_src_id = src_id;
    chosen_distance_sq = src_distance_sq;
  }
  if (chosen_src_id == 0) {
    console.log("No one with enough rams");
    return;
  }
  target_list = target_list.slice(1, target_list.length);
  setCookie("ram2_dst", target_list.join(), 1);
  if (chosen_distance_sq > max_range * max_range) {
    attackNext();
    return;
  }
  
  goto("screen=place&village=" + chosen_src_id + "&xy=" + target_xy + "&wall=" + wall);
}

if (screen == "overview_villages" && mode == "combined") {
  parseOverview();
  goto("screen=am_farm");
} else if (screen == "am_farm") {
  parseWalls();
  attackNext();
} else if (screen == "report") {
  attack_village();
} else if (screen == "place") {
  if (!screen_is_try_confirm) {
    var xy = window.location.href.match(/xy=([|\d]+)/);
    if (xy == undefined) {
      attackNext();
    } else {
      fill_units(xy[1]);
    }
  }
} else {
  var group_text = "";
  if (group_id != -1) group = "&group=" + group_id
  goto("screen=overview_villages&mode=combined" + group_text);
} 
