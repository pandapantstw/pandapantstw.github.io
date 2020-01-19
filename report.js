javascript:

var world_url = "https://" + window.location.href.match(/[a-z]+\d+.tribalwars.net/)[0];
var screen = window.location.href.match(/screen=([a-z_]+)/)[1];
var mode = window.location.href.match(/mode=([a-z_]+)/);
if (mode != null) mode = mode[1];
var group_id = window.location.href.match(/group_id=([0-9a-z_]+)/);
if (group_id != null) group_id = group_id[1];

function goto(params) {
  console.log(world_url + "/game.php?" + params);
  //console.log(window.location.href = world_url + "/game.php?" + params);
}

function doReports() {
  var reports = $("#report_list tr");
  reports = reports.slice(1, reports.length - 1);
  var checked = false;
  for (var i = 0; i < reports.length; i++) {
    var tds = reports[i].getElementsByTagName("td");
    var is_yellow = tds[1].innerHTML.includes("yellow.png");
    var is_barb = tds[1].innerText.includes("Barbarian Village") || tds[1].innerText.includes("Bonus Village");
    if (is_barb) {
      if (is_yellow) {
        tds[0].getElementsByTagName("input")[0].click();
        checked = true;
      }
    }
  }
}

if (screen == "report" && mode == "attack" && group_id == "0") {
  doReports();
} else {
  goto("screen=report&mode=attack&group_id=0");
}
