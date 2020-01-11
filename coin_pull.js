javascript:

var warehouse_ratio = 0.8;
var reserve = 1000;

function doStuff() {
  var local = [
      parseInt($("#wood")[0].innerText),
      parseInt($("#stone")[0].innerText),
      parseInt($("#iron")[0].innerText)];
  var incoming = [
      parseInt($(".res.wood")[0].innerText.replace(".","")),
      parseInt($(".res.stone")[0].innerText.replace(".","")),
      parseInt($(".res.iron")[0].innerText.replace(".",""))];
  var warehouse = parseInt($("#storage")[0].innerText);
  var target = [
      parseInt(warehouse * warehouse_ratio) - local[0] - incoming[0],
      parseInt(warehouse * warehouse_ratio) - local[1] - incoming[1],
      parseInt(warehouse * warehouse_ratio) - local[2] - incoming[2]];
      
  console.log("Want " + target);
  var checkbox = [
      $("#checkbox_wood")[0],
      $("#checkbox_stone")[0],
      $("#checkbox_iron")[0]];
  var reached_cap = true;
  for (var i = 0; i < target.length; i++) {
    var needs_filling = target[i] > 0;
    checkbox[i].checked = needs_filling;
    if (needs_filling) reached_cap = false;
  }
  if (reached_cap) return;
  var select_all_checkbox = $('input[name$="select-all"]')[0];
  if (select_all_checkbox.checked) select_all_checkbox.click();
  select_all_checkbox.click();
  
  var rows = $("tr.supply_location");
  var zero_remaining = false;
  for (var i = 0; i < rows.length; i++) {
    var tds = rows[i].getElementsByTagName("td");
    var input = [
        tds[2].getElementsByTagName("input")[0],
        tds[3].getElementsByTagName("input")[0],
        tds[4].getElementsByTagName("input")[0]];
    if (zero_remaining) {
     input[0].value = 0;
     input[1].value = 0;
     input[2].value = 0;
    }
    var local_target = [
        parseInt(input[0].value),
        parseInt(input[1].value),
        parseInt(input[2].value)];
    for (var j = 0; j < target.length; j++) {
      if (local_target[j] < reserve) local_target[j] = 0;
      if (local_target[j] > target[j]) {
        local_target[j] = target[j];
        zero_remaining = true;
      }
      target[j] -= local_target[j];
      input[j].value = local_target[j];
    }
    console.log(local_target);
    console.log(target);
  }
}

doStuff();
