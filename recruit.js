javascript:

var axe_index;
var spear_index;
var scout_index;

function doStuff() {
  var rows = $("#mass_train_table tr");
  
  for(var i = 1; i < 2; i++) {
    var tds = rows[i].getElementsByTagName("td");
    var resources = tds[1].innerText.replace(/\./g, "").split("\n");
    var farm = tds[2].innerText.split("/");
    var built = [];
    var building = [];
    for (var j = 3; j < tds.length; j++) {
      built = built.concat(parseInt(tds[j].getElementsByTagName("input")[0].getAttribute("data-existing")));
      building = building.concat(parseInt(tds[j].getElementsByTagName("input")[0].getAttribute("data-running")));
    }
    console.log(built);
    console.log(building);
  }
}
doStuff();
