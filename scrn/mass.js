javascript:

function parseMassRecruitVillages() {
  var rows = $("#mass_train_table tr:not(:first):visible");
  var villages = new Object();
  for (var i = 0; i < rows.length; i++) {
    villages[i] = new Object();
    var cols = rows[i].children;
    villages[i].name = cols[0].innerText;
    villages[i].res = cols[1].innerText.replace(/\./g, "").split("\n");
    for (var j = 0 ; j < villages[i].res.length; j++) villages[i].res[j] = parseInt(villages[i].res[j]);
    villages[i].farm_used = parseInt(cols[2].innerText.split("/")[0]);
    villages[i].farm_total = parseInt(cols[2].innerText.split("/")[1]);
    villages[i].troops_built = [];
    villages[i].troops_building = [];
    villages[i].input = [];
    for (var j = 3; j < cols.length; j++) {
      var input = cols[j].getElementsByTagName("input")[0];
      villages[i].input = villages[i].input.concat(input);
      villages[i].troops_built = villages[i].troops_built.concat(parseInt(input.getAttribute("data-existing")));
      villages[i].troops_building = villages[i].troops_building.concat(parseInt(input.getAttribute("data-running")));
    }
  }
  return villages;
}
var villages = parseMassRecruitVillages();
console.log(villages);

function parseUnitNames() {
  var rows = $("#mass_train_table tr");
  var cols = rows[0].children;
  var names = [];
  for (var j = 3; j < cols.length; j++) {
    names = names.concat(cols[j].getElementsByTagName("img")[0].getAttribute("title"));
  }
  return names;
}
var unitNames = parseUnitNames();
