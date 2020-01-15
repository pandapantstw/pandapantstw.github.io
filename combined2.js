javascript:

var filter_hours = 12;

var world_url = "https://" + window.location.href.match(/[a-z]+\d+.tribalwars.net/)[0];
var screen = window.location.href.match(/screen=([a-z_]+)/)[1];
var mode = window.location.href.match(/mode=([a-z_]+)/);
if (mode != null) mode = mode[1];

function goto(params) {
  window.location.href = world_url + "/game.php?" + params;
}

var now_time = $("#serverTime")[0].innerText;
var now_date_raw = $("#serverDate")[0].innerText;
var now_date_matched = now_date_raw.match(/(\d+)\/(\d+)\/(\d+)/);
var now = new Date(now_date_matched[2] + "/" + now_date_matched[1] + "/" + now_date_matched[3] + " " + now_time);
var tomorrow = new Date(now); 
tomorrow.setDate(tomorrow.getDate() + 1);
var filter_limit = new Date(now);
filter_limit.setHours(filter_limit.getHours() + filter_hours);

function manipulateDot(content) {
  var img = content.getElementsByTagName("img")[0];
  var raw_time = img.title.split(" - ")[0];
  raw_time = raw_time.replace("on ", "");
  var day = 0;
  var month = 0;
  if (raw_time.includes("No recruitment")) {
      return now;
  } else if (raw_time.includes("No production")) {
      return now;
  } else if (raw_time.includes("today")) {
    day = now.getDate();
    month = now.getMonth();
  } else if (raw_time.includes("tomorrow")) {
    day = tomorrow.getDate();
    month = tomorrow.getMonth();
  } else {
    var daymonth = raw_time.match(/(\d+)\.(\d+)\./);
    day = parseInt(daymonth[1]);
    month = parseInt(daymonth[2]) - 1;
  }
  
  var hourminute = raw_time.match(/(\d+):(\d+)/);
  var hour = hourminute[1];
  var minute = hourminute[2];
  
  var result = new Date(now);
  result.setMonth(month);
  result.setDate(day);
  result.setHours(hour);
  result.setMinutes(minute);
  
  if (result > filter_limit) {
    img.src = img.src.replace("prod_running", "prod_finish");
    return true;
  }
  return false;
}

function getHoursBetween(date1, date2) {
  var result = parseInt(Math.abs(date1 - date2) / (60 * 60 * 1000));
  if (result < 10) {
    result = "0" + result;
  }
  return result + "h";
}

function printSlowVillages() {
  var village_list = $("#combined_table tr:not(:first-child)");
  
  for (i = 0; i < village_list.length; i++) {
    var tds = village_list[i].getElementsByTagName("td");
    var building = manipulateDot(tds[2]);
    var rax = manipulateDot(tds[3]);
    var stable = manipulateDot(tds[4]);
    if (building && rax && stable) village_list[i].remove();
    var farm_match = tds[7].innerText.match(/(\d+) \((\d+)\)/);
    var farm_available = parseInt(farm_match[1]);
    var farm_level = parseInt(farm_match[2]);
    var farm_building = tds[2].getElementsByTagName("img")[0].title.split(" - ")[1].includes("Farm");
    if (farm_level == 30 && farm_available > 500) village_list[i].remove();
    if (farm_available < 10 && farm_level) village_list[i].remove();
  }
}

if (screen == "overview_villages" && mode == "combined") {
  printSlowVillages();
} else {
  goto("screen=overview_villages&mode=combined&group=0");
}
