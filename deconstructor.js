javascript:

var building_points = [
[0,10,12,14,17,21,25,30,36,43,52,62,74,89,107,128,154,185,222,266,319,383,460,552,662,795,954,1145,1374,1648,1978],
[0,16,19,23,28,33,40,48,57,69,83,99,119,143,171,205,247,296,355,426,511,613,736,883,1060,1272],
[0,20,24,29,35,41,50,60,72,86,103,124,149,178,214,257,308,370,444,532,639],
[0,24,29,35,41,50,60,72,86,103,124,149,178,214,257,308],
[0,512],
[0,19,23,27,33,39,47,57,68,82,98,118,141,169,203,244,293,351,422,506,607],
[0,10,12,14,17,21,25,30,36,43,52,62,74,89,107,128,154,185,222,266,319,383,460,552,662,795],
[0,6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230,276,331,397,477,572,687,824,989,1187],
[0,6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230,276,331,397,477,572,687,824,989,1187],
[0,6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230,276,331,397,477,572,687,824,989,1187],
[0,5,6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230,276,331,397,477,572,687,824,989],
[0,6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230,276,331,397,477,572,687,824,989,1187],
[0,5,6,7,9,10,12,15,18,21,26],
[0,8,10,12,14,17,20,24,29,34,41,50,59,71,86,103,123,148,177,213,256]
];

function weight(levels) {
  var result = 0;
  for (var i = 0; i < levels.length; i++) {
    result += building_points[i][levels[i]];
  }
  return result;
}

function filter(candidates, limit) {
  var result = [];
  for (var i = 0; i < candidates.length; i++) {
    console.log(candidates[i]);
    console.log(weight(candidates[i]));
    console.log(limit);
    if (weight(candidates[i]) <= limit) {
      result = result.concat([candidates[i]]);
    }
  }
  console.log(result.length);
  return result;
}

function expand(base_build, base_points) {
  var round_candidates = [];
  var candidate = base_build;
  for (var i = 0; i < candidate.length; i++) {
    var next = candidate.slice();
    next[i]++;
    round_candidates = round_candidates.concat([next]);
  }
  console.log(round_candidates.length);
  var filtered = filter(round_candidates, base_points);
  console.log(filtered.length);
  return filtered;
}

var rows = $$("tr.r1, tr.r2");
var tds = rows[0].getElementsByTagName("td");

var growth_points = parseInt(tds[2].innerText);
var target_points = parseInt(tds[1].innerText);

var base_points = target_points - growth_points;
var base_build = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var candidates = expand(base_build, base_points);
var round_candidates = [];

var i = 0;
//for (var i = 0; i < candidates.length; i++) {
  var next = expand(candidates[i], base_build);
  console.log(next.length);
  round_candidates = round_candidates.concat(next);
//}
console.log(round_candidates.length);
