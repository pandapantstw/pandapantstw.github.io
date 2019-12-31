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
console.log(wood);
console.log(clay);
console.log(iron);
