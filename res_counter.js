javascript:

var woods = $(".res.wood");
var clays = $(".res.stone");
var irons = $(".res.iron");

var wood = 0;
var clay = 0;
var iron = 0;
for(var i = 0; i < woods.length; i++) {
  wood += parseInt(woods[i].innerText.replace(".", ""));
  clay += parseInt(clays[i].innerText.replace(".", ""));
  iron += parseInt(irons[i].innerText.replace(".", ""));
}
if (wood > 1000) wood = (wood / 1000).toFixed(2) + "k";
else if (wood > 1000) wood = (wood / 1000000).toFixed(2) + "m";
if (clay > 1000) clay = (clay / 1000).toFixed(2) + "k";
else if (clay > 1000) clay = (clay / 1000000).toFixed(2) + "m";
if (iron > 1000) iron = (iron / 1000).toFixed(2) + "k";
else if (iron > 1000) iron = (iron / 1000000).toFixed(2) + "m";
alert("wood = " + wood + "\nclay = " + clay + "\niron = " + iron);
