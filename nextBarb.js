javascript:

function getCookies() {
  var raw_list = document.cookie.split("; ");
  var cookies = new Object();
  for (i = 0; i < raw_list.length; i++) {
    var raw_split = raw_list[i].split("=");
    cookies[raw_split[0]] = raw_split[1];
  }
  return cookies;
}

function setCookie(key, value) {
  document.cookie = key + "=" + value + ";expires=-1";
}

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

function gotoNextBarb() {
  
}

function main() {
  var cookies = getCookies();
  console.log(cookies);
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

  console.log(target);
}

$.get('https://pandapantstw.github.io/base.js', main);
void(0);
