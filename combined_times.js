javascript:

var world_url = "https://en110.tribalwars.net";
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
console.log(now);
console.log(tomorrow);

function parseDateTimeFromTd(content) {
  var raw = content.getElementsByTagName("img")[0].title.split(" - ")[0];
  raw = raw.replace("on ", "");
  var day = 0;
  var month = 0;
  if (raw.includes("No recruitment")) {
      return now;
  } else if (raw.includes("No production")) {
      return now;
  } else if (raw.includes("today")) {
    day = now.getDate();
    month = now.getMonth();
  } else if (raw.includes("tomorrow")) {
    day = tomorrow.getDate();
    month = tomorrow.getMonth();
  } else {
    var daymonth = raw.match(/(\d+)\.(\d+)\./);
    day = parseInt(daymonth[1]);
    month = parseInt(daymonth[2]) - 1;
  }
  
  var hourminute = raw.match(/(\d+):(\d+)/);
  var hour = hourminute[1];
  var minute = hourminute[2];
  
  var result = new Date(now);
  result.setMonth(month);
  result.setDate(day);
  result.setHours(hour);
  result.setMinutes(minute);
  
  return result;
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
    var building = parseDateTimeFromTd(tds[2]);
    var rax = parseDateTimeFromTd(tds[3]);
    var stable = parseDateTimeFromTd(tds[4]);
    if (building < tomorrow || rax < tomorrow || stable < tomorrow) {
      document.body.innerHTML += getHoursBetween(now, building) + " ";
      document.body.innerHTML += getHoursBetween(now, rax) + " ";
      document.body.innerHTML += getHoursBetween(now, stable) + " ";
      document.body.innerHTML += tds[1].innerText.trim() + "</br>";
    }
  }
}

if (screen == "overview_villages" && mode == "combined") {
  printSlowVillages();
} else {
  goto("screen=overview_villages&mode=combined&group=0");
}
