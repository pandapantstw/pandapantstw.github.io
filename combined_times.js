javascript:

var now = new Date($("#serverDate")[0].innerText + " " + $("#serverTime")[0].innerText);
var tomorrow = new Date(now); 
tomorrow.setDate(tomorrow.getDate() + 1);

function extractStuff(content) {
  var raw = content.getElementsByTagName("img")[0].title.split(" - ")[0];
  raw = raw.replace("on ", "");
//  raw = raw.replace("today", now.getDay() + "." + now.getMonth() + ".");
//  raw = raw.replace("tomorrow", tomorrow.getDay() + "." + tomorrow.getMonth() + ".");
  return raw;
}

function doStuff() {
  var village_list = $("#combined_table tr:not(:first-child)");
  
  for (i = 0; i < village_list.length; i++) {
    var tds = village_list[i].getElementsByTagName("td");
    var building = extractStuff(tds[2]);
    var rax = extractStuff(tds[3]);
    var stable = extractStuff(tds[4]);
    document.body.innerHTML += building + "</br>" + rax + "</br>" + stable + "</p>";
  }
}
  
doStuff();
