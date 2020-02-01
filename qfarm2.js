javascript:

function doFarm() {
  var commands = $(".command-row");
  var attack_count = new Object();
  for (var i = 0; i < commands.length; i++) {
    var imgs = commands[i].innerHTML.match(/[a-z0-9_]+.png/g);
    if (!imgs.includes("spy.png")) continue;
    var xy = commands[i].innerText.match(/\d+\|\d+/g);
    if (attack_count[xy] == undefined) attack_count[xy] = 0;
    attack_count[xy]++;
  }
  console.log(attack_count);
}

function main() {
  if (url.params.screen == "place") {
    if (url.params.try != "confirm") {
      doFarm();
    }
//  } if (url.params.screen == "place") {
  } else {
    goto("screen=place");
  }
}
$.get('https://pandapantstw.github.io/base.js', main);
void(0);
