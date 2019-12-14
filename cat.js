javascript:

function getCookie(key) {
  var raw_list = document.cookie.split("; ");
  for (i = 0; i < raw_list.length; i++) {
    var key_value = raw_list[i].split("=");
    if (key == key_value[0]) return key_value[1];
  }
}

function setCookie(key, value) {
  document.cookie = key + "=" + value + ";expires=-1";
}

var screen = window.location.href.match(/screen=([a-z]+)/)[1];

function scrape_report() {
  var def_raw_village = document.getElementById('attack_info_def').rows[1].cells[1].firstChild.firstChild;
  var def_xy = def_raw_village.innerHTML.split("(")[1].split(")")[0];
  return {def_xy : def_xy}
}

var scraping = scrape_report();
var buildings_left = document.getElementById('attack_spy_buildings_left');

console.log(buildings_left);
