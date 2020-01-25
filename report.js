javascript:

function doReports() {
  var reports = $("#report_list tr");
  reports = reports.slice(1, reports.length - 1);
  var checked = false;
  for (var i = 0; i < reports.length; i++) {
    var tds = reports[i].getElementsByTagName("td");
    var images = tds[1].innerHTML.match(/\/graphic\/([a-z\/_]+)\.png/g);
    var dot = tds[1].innerHTML.match(/\/dots\/([a-z_]+)\.png/);
    if (dot != undefined) dot = dot[1];
    var attack_size = tds[1].innerHTML.match(/\/command\/attack_([a-z_]+)\.png/);
    if (attack_size != undefined) attack_size = attack_size[1];
    var is_barb = tds[1].innerText.includes("Barbarian Village") || tds[1].innerText.includes("Bonus Village");
    if (is_barb && attack_size == "small") {
      if (dot == "yellow" || dot == "green") {
        tds[0].getElementsByTagName("input")[0].click();
        checked = true;
      }
    }
  }
  if (checked) $('input[value="Move"]').click();
}
function main() {
  if (ensureUrl("screen=report&mode=attack&group_id=0")) return;
  doReports();
}
$.get('https://pandapantstw.github.io/base.js', main);
void(0);
