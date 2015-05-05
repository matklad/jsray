$traceurRuntime.options.symbols = true;
System.registerModule("../src/vector.js", [], function(require) {
  "use strict";
  var $__0;
  var __moduleName = "../src/vector.js";
  var Vector = (function(x, y, z) {
    return {
      x: x,
      y: y,
      z: z,
      add: ($traceurRuntime.initTailRecursiveFunction(function(rhs) {
        return $traceurRuntime.call(function(rhs) {
          return $traceurRuntime.continuation(Vector, null, [x + rhs.x, y + rhs.y, z + rhs.z]);
        }, this, arguments);
      })),
      sub: ($traceurRuntime.initTailRecursiveFunction(function(rhs) {
        return $traceurRuntime.call(function(rhs) {
          return $traceurRuntime.continuation(Vector, null, [x - rhs.x, y - rhs.y, z - rhs.z]);
        }, this, arguments);
      })),
      dot: (function(rhs) {
        return x * rhs.x + y * rhs.y + z * rhs.z;
      }),
      cross: ($traceurRuntime.initTailRecursiveFunction(function(rhs) {
        return $traceurRuntime.call(function(rhs) {
          var $__1 = rhs,
              a = $__1.x,
              b = $__1.y,
              c = $__1.z;
          return $traceurRuntime.continuation(Vector, null, [y * c - z * b, z * z - x * c, x * b - y * a]);
        }, this, arguments);
      })),
      scale: ($traceurRuntime.initTailRecursiveFunction(function(alpha) {
        return $traceurRuntime.call(function(alpha) {
          return $traceurRuntime.continuation(Vector, null, [x * alpha, y * alpha, z * alpha]);
        }, this, arguments);
      }))
    };
  });
  return ($__0 = {}, Object.defineProperty($__0, "Vector", {
    get: function() {
      return Vector;
    },
    configurable: true,
    enumerable: true
  }), $__0);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/ray.js", [], function(require) {
  "use strict";
  var $__1;
  var __moduleName = "../src/ray.js";
  var Vector = System.get("../src/vector.js").Vector;
  var Ray = (function(origin, direction) {
    return {
      origin: origin,
      direction: direction,
      point_along: ($traceurRuntime.initTailRecursiveFunction(function(t) {
        return $traceurRuntime.call(function(t) {
          return $traceurRuntime.continuation(origin.add, origin, [direction.scale(t)]);
        }, this, arguments);
      }))
    };
  });
  return ($__1 = {}, Object.defineProperty($__1, "Ray", {
    get: function() {
      return Ray;
    },
    configurable: true,
    enumerable: true
  }), $__1);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/utils.js", [], function(require) {
  "use strict";
  var $__0;
  var __moduleName = "../src/utils.js";
  var solve_square_equation = (function(a, b, c) {
    if (a == 0.0) {
      if (b == 0.0) {
        return [];
      } else {
        return [-c / b];
      }
    } else {
      var d = b * b - 4 * a * c;
      if (d < 0) {
        return [];
      }
      return [(-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)];
    }
  });
  return ($__0 = {}, Object.defineProperty($__0, "solve_square_equation", {
    get: function() {
      return solve_square_equation;
    },
    configurable: true,
    enumerable: true
  }), $__0);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/sphere.js", [], function(require) {
  "use strict";
  var $__2;
  var __moduleName = "../src/sphere.js";
  var Ray = System.get("../src/ray.js").Ray;
  var solve_square_equation = System.get("../src/utils.js").solve_square_equation;
  var Sphere = (function(center, radius) {
    return {
      center: center,
      radius: radius,
      intersect: (function(ray) {
        var $__4;
        var $__3 = ray,
            o = $__3.origin,
            d = $__3.direction;
        var a = d.dot(d);
        var b = 2 * d.dot(o.sub(center));
        var c = o.sub(center).dot(o.sub(center));
        var roots = solve_square_equation(a, b, c - radius * radius);
        roots = roots.filter((function(x) {
          return x >= 0;
        }));
        var t = ($__4 = Math).min.apply($__4, $traceurRuntime.spread(roots));
        if (t < Infinity) {
          return t;
        } else {
          return -1;
        }
      }),
      normal_at: ($traceurRuntime.initTailRecursiveFunction(function(point) {
        return $traceurRuntime.call(function(point) {
          return $traceurRuntime.continuation(Vector, null, [92, 92, 92]);
        }, this, arguments);
      }))
    };
  });
  return ($__2 = {}, Object.defineProperty($__2, "Sphere", {
    get: function() {
      return Sphere;
    },
    configurable: true,
    enumerable: true
  }), $__2);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/main.js", [], function(require) {
  "use strict";
  var __moduleName = "../src/main.js";
  var Sphere = System.get("../src/sphere.js").Sphere;
  var solve_square_equation = System.get("../src/utils.js").solve_square_equation;
  $((function() {
    window.foo = (solve_square_equation(1, -4, 4));
    var sc = $("#screen").get(0);
    var ctx = sc.getContext("2d");
    ctx.fillRect(0, 0, sc.width, sc.height);
  }));
  return {};
});
System.get("../src/main.js" + '');
