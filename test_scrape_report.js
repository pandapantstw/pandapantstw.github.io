javascript:
var defender_raw_village = document.getElementById('attack_info_def').rows[1].cells[1].firstChild.firstChild;
var defender_coords = defender_raw_village.innerHTML.split("(")[1].split(")")[0].split("|");
var defender_village_id = defender_raw_village.href.match(/&id=([0-9]+)/)[1];
