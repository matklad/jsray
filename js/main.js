$traceurRuntime.options.symbols = true;
System.registerModule("../src/main.js", [], function(require) {
  "use strict";
  var __moduleName = "../src/main.js";
  $((function() {
    var sc = document.getElementById("screen");
    var ctx = sc.getContext("2d");
    ctx.fillRect(0, 0, sc.width, sc.height);
  }));
  return {};
});
System.get("../src/main.js" + '');
