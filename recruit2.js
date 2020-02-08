javascript:

function main() {
  return 0;
}

$.when(
  $.getScript('https://pandapantstw.github.io/base.js'),
  $.getScript('https://pandapantstw.github.io/scrn/mass.js'),
  $.Deferred(function(deferred) { $(deferred.resolve); })
).done(main);
void(0);
