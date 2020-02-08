javascript:

if (typeof hours === 'undefined') hours = 24;

if (typeof builds === 'undefined') {
  builds = new Object();
  builds["Of"] = [0,8,6000,0,100,3000,0,8,240,100,5];
}

// 3 res, farm, raxtime, stabletime, wktime
var unit_cost = [
  [50,30,10,1,142,0,0],
  [30,30,70,1,209,0,0],
  [60,30,40,1,184,0,0],
  [100,30,60,1,250,0,0],
  [50,50,20,2,0,168,0],
  [125,100,250,4,0,335,0],
  [250,100,150,5,0,502,0],
  [200,150,600,6,0,669,0],
  [300,200,200,5,0,0,2543],
  [320,400,100,8,0,0,3815],
//  [20,20,40,10],
  [40000,50000,50000,100,0,0,0],
];

function main() {
  var i = 0; {
//  for (var i = 0; i < villages.length; i++) {
    var target = builds["Of"].slice();
    var tobuild = new Object();
    var time_avail = [hours*60*60, hours*60*60, hours*60*60];
    var time_tot = [0,0,0];
    var target_time = [];
    for (var j = 0; j < target.length; j++) {
      target[j] = target[j] - villages[i].troops_built[j] - villages[i].troops_building[j];
      if (target[j] < 0) target[j] = 0;
      for (var k = 0; k < time_avail.length; k++) {
        time_avail[k] -= unit_cost[j][k + 4] * villages[i].troops_building[j];
        time_tot[k] += unit_cost[j][k + 4] * target[j];
      }
    }
    for (var j = 0; j < time_avail.length; j++) if (time_avail[j] < 0) time_avail[j] = 0;
    console.log(time_avail[0] + "\t" + time_avail[1] + "\t" + time_avail[2] + "\t" + "");
    
  }
}

$.when(
  $.getScript('https://pandapantstw.github.io/base.js'),
  $.getScript('https://pandapantstw.github.io/scrn/mass.js'),
  $.Deferred(function(deferred) { $(deferred.resolve); })
).done(main);
void(0);
