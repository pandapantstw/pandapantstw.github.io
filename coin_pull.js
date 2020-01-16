javascript:

if (typeof warehouse_ratio === 'undefined') warehouse_ratio = 0.8;
if (typeof reserve === 'undefined') reserve = 1000;

var world_url = "https://" + window.location.href.match(/[a-z]+\d+.tribalwars.net/)[0];
var screen = window.location.href.match(/screen=([a-z_]+)/)[1];
var screen_is_try_confirm = window.location.href.includes("try=confirm");
var mode = window.location.href.match(/mode=([a-z_]+)/);
if (mode != null) mode = mode[1];

function goto(params) {
  window.location.href = world_url + "/game.php?" + params;
}

function marketPull() {
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
    if (target[i] < 0) target[i] = 0;
    if (checkbox[i].checked) checkbox[i].click();
    if (target[i] > 0) {
      checkbox[i].click();
      reached_cap = false;
    }
  }
  if (reached_cap) return;
//  var select_all_checkbox = $('input[name$="select-all"]')[0];
//  if (select_all_checkbox.checked) select_all_checkbox.click();
//  select_all_checkbox.click();
  
  var rows = $("tr.supply_location");
  for (var i = 0; i < rows.length; i++) {
    var tds = rows[i].getElementsByTagName("td");
    var checkbox = tds[7].getElementsByTagName("input")[0];
    if (checkbox.checked) checkbox.click();
    checkbox.click();
    var input = [
        tds[2].getElementsByTagName("input")[0],
        tds[3].getElementsByTagName("input")[0],
        tds[4].getElementsByTagName("input")[0]];
    var local_target = [
        parseInt(input[0].value),
        parseInt(input[1].value),
        parseInt(input[2].value)];
    var finished = false;
    for (var j = 0; j < target.length; j++) {
      if (local_target[j] < reserve) local_target[j] = 0;
      if (local_target[j] > target[j]) {
        local_target[j] = target[j];
        if (target[j] > 0) finished = true;
      }
      target[j] -= local_target[j];
      input[j].value = local_target[j];
    }
    if (finished) return;
  }
}

if (screen == "market" && mode == "call") {
  marketPull();
} else {
  goto("screen=market&mode=call");
}
