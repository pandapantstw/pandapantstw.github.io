javascript:


function distance_sq(a, b) {
  ax = Math.floor(a / 1000);
  ay = a - ax * 1000;
  bx = Math.floor(b / 1000);
  by = b - bx * 1000;
  return (ax - bx)*(ax - bx) + (ay - by)*(ay - by);
}

function nextBarb(villages) {
  for (v in villages) {
    if (villages[v].owner != 0) continue;
    return villages[v];
  }
  return undefined;
}

function doMap() {
  var village_xy = parseInt($("#menu_row2_village")[0].parentElement.innerText.match(/\d+\|\d+/)[0].replace("|", ""));
  var villages = [];
  for (v in TWMap.villages) {
    villages = villages.concat(TWMap.villages[v]);
  }

  villages.sort(
    function(a, b) {
      return distance_sq(a.xy, village_xy) - distance_sq(b.xy, village_xy); 
    }
  );
  
  var target = nextBarb(villages);
  goto("screen=info_village&id=" + target.id);
}

function blacklistVilla() {
  
}

function doVillage() {
  var reportList = $("#report_table tr:not(:first-child)");
  if (reportList.length == 0) {
    blacklistVilla();
    return;
  }
  var reportHtml = reportList[0].innerHTML;
  var reportId = reportHtml.match(/view=(\d+)/)[1];
  goto("screen=report&mode=all&view=" + reportId);
}

function main() {
  if (url.params.screen == "map") {
    doMap();
  } else if (url.params.screen == "info_village") {
    doVillage();
  } else {
    goto("screen=map");
  }

}

$.get('https://pandapantstw.github.io/base.js', main);
void(0);
