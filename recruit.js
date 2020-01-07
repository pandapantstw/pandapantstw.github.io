javascript:

var spear_index = 0;
var axe_index = 2;
var scout_index = 4;

var hours = 12;
var refill_factor = 2;
var off_per_hour = [0,0,20,0,0,10,0,0,1,0,0];
var off_limit = [0,0,6000,0,0,3000,0,0,240,0,0];
var unit_cost = [
  [50,30,10],
  [30,30,70],
  [60,30,40],
  [100,30,60],
  [50,50,20],
  [125,100,250],
  [250,100,150],
  [200,150,600],
  [300,200,200],
  [320,400,100],
  [20,20,40],
  [40000,50000,50000],
];

function vector_add(a, b) {
  var result = a.slice();
  for (var i = 0; i < result.length; i++) result[i] += b[i];
  return result;
}
function vector_mul(a, b) {
  var result = a.slice();
  for (var i = 0; i < result.length; i++) result[i] *= b;
  return result;
}

function doStuff() {
  var rows = $("#mass_train_table tr");
  
//  for(var i = 1; i < 2; i++) {
  for(var i = 1; i < rows.length; i++) {
    var tds = rows[i].getElementsByTagName("td");
    var resources = tds[1].innerText.replace(/\./g, "").split("\n");
    for (var j = 0 ; j < resources.length; j++) resources[j] = parseInt(resources[j]);
    var farm = tds[2].innerText.split("/");
    var built = [];
    var building = [];
    for (var j = 3; j < tds.length; j++) {
      built = built.concat(parseInt(tds[j].getElementsByTagName("input")[0].getAttribute("data-existing")));
      building = building.concat(parseInt(tds[j].getElementsByTagName("input")[0].getAttribute("data-running")));
    }
    // Skip defensive
    if (built[spear_index] + building[spear_index] > 100) continue;
    var target = off_per_hour.slice();
    var resource_cost = [0,0,0];
    var should_build = false;
    // Loop around the list of units to calculate production targets and costs
    for (var j = 0 ; j < target.length; j++) {
      target[j] *= hours;
      if (building[j] < target[j]) should_build = true;
      target[j] *= refill_factor;
      target[j] -=  building[j];
      if (target[j] < 0) target[j] = 0;
      if (target[j] + built[j] > off_limit[j]) target[j] = off_limit[j] - built[j];
      if (target[j] < 0) target[j] = 0;
      var resource_cost = vector_add(resource_cost, vector_mul(unit_cost[j], target[j]));
    }
    console.log(resource_cost);
    console.log(resources);
    if (!should_build) continue;
    console.log("Want to fill " + i + " with [" + target + "]");
    var ratio = 1;
    for (var j = 0; j < resource_cost.length; j++) {
      if (resources[j] < ratio * resource_cost[j]) {
        ratio = resources[j] / resource_cost[j];
        should_build = false;
      }
    }
    console.log("Filling " + i + " with [" + target + "] at ratio " + ratio);
    for (var j = 0 ; j < target.length; j++) {
      tds[3 + j].getElementsByTagName("input")[0].value = parseInt(ratio * target[j]);
    }
  }
}
doStuff();
