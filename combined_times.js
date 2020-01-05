javascript:

var now_time = $("#serverTime")[0].innerText;
var now_date_raw = $("#serverDate")[0].innerText;
var now_date_matched = now_date_raw.match(/(\d+)\/(\d+)\/(\d+)/);
var now = new Date(now_date_matched[2] + "/" + now_date_matched[1] + "/" + now_date_matched[3] + " " + now_time);
var tomorrow = new Date(now); 
tomorrow.setDate(tomorrow.getDate() + 1);
console.log(now);
console.log(tomorrow);

function extractStuff(content) {
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

function doStuff() {
  var village_list = $("#combined_table tr:not(:first-child)");
  
  for (i = 0; i < village_list.length; i++) {
    var tds = village_list[i].getElementsByTagName("td");
    var building = extractStuff(tds[2]);
    var rax = extractStuff(tds[3]);
    var stable = extractStuff(tds[4]);
    if (building < tomorrow || rax < tomorrow || stable < tomorrow) 
      document.body.innerHTML += tds[1].innerText.trim() + "</br>" + building + "</br>" + rax + "</br>" + stable + "</p>";
  }
}

doStuff();
