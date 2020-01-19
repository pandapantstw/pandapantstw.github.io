javascript:

var reports = $("#report_list tr");
reports = reports.slice(1, reports.length - 1);
for (var i = 0; i < reports.length; i++) {
  var tds = reports[i].getElementsByTagName("td");
  var is_yellow = tds[1].innerHTML.includes("yellow.png");
  var is_barb = tds[1].innerText.includes("Barbarian Village") || tds[1].innerText.includes("Bonus Village");
  if (is_barb) {
    if (is_yellow) tds[0].getElementsByTagName("input")[0].click();
  }
}
