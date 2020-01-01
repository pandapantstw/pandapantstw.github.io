javascript:

var village_xy = parseInt($("#menu_row2_village")[0].parentElement.innerText.match(/\d+\|\d+/)[0].replace("|", ""));
var villages = [];
for (v in TWMap.villages) {
  villages = villages.concat(TWMap.villages[v]);
}

function distance_sq(a, b) {
  ax = Math.floor(a / 1000);
  ay = a - ax * 1000;
  bx = Math.floor(b / 1000);
  by = b - bx * 1000;
  return (ax - bx)*(ax - bx) + (ay - by)*(ay - by);
}

villages.sort(
  function(a, b) { 
    a
    return distance_sq(a.xy, village_xy) - distance_sq(b.xy, village_xy); 
  }
);

function nextBarb(villages) {
  for (v in villages) {
    if (villages[v].owner != 0) continue;
    return villages[v];
  }
  return undefined;
}
console.log(nextBarb(villages));
