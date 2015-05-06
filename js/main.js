$traceurRuntime.options.symbols = true;
System.registerModule("../src/color.js", [], function(require) {
  "use strict";
  var $__0;
  var __moduleName = "../src/color.js";
  var Color = (function(r, g, b) {
    return {
      r: r,
      g: g,
      b: b,
      as_rgba_str: (function() {
        var f = ($traceurRuntime.initTailRecursiveFunction(function(alpha) {
          return $traceurRuntime.call(function(alpha) {
            return $traceurRuntime.continuation(Math.min, Math, [Math.round((alpha * 255)), 255]);
          }, this, arguments);
        }));
        return "rgba(" + f(r) + "," + f(g) + "," + f(b) + "," + 255 + ")";
      }),
      under_light: ($traceurRuntime.initTailRecursiveFunction(function(light) {
        return $traceurRuntime.call(function(light) {
          return $traceurRuntime.continuation(Color, null, [r * light.r, g * light.g, b * light.b]);
        }, this, arguments);
      })),
      mix_with: ($traceurRuntime.initTailRecursiveFunction(function(other) {
        return $traceurRuntime.call(function(other) {
          return $traceurRuntime.continuation(Color, null, [r + other.r, g + other.g, b + other.b]);
        }, this, arguments);
      })),
      set_bright: ($traceurRuntime.initTailRecursiveFunction(function(bright) {
        return $traceurRuntime.call(function(bright) {
          return $traceurRuntime.continuation(Color, null, [r * bright, g * bright, b * bright]);
        }, this, arguments);
      }))
    };
  });
  var colors = {
    white: Color(0.9, 0.9, 0.9),
    black: Color(0.1, 0.1, 0.1),
    red: Color(0.9, 0.1, 0.1),
    green: Color(0.1, 0.9, 0.1),
    blue: Color(0.1, 0.1, 0.9)
  };
  return ($__0 = {}, Object.defineProperty($__0, "Color", {
    get: function() {
      return Color;
    },
    configurable: true,
    enumerable: true
  }), Object.defineProperty($__0, "colors", {
    get: function() {
      return colors;
    },
    configurable: true,
    enumerable: true
  }), $__0);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/vector.js", [], function(require) {
  "use strict";
  var $__2;
  var $__0;
  var __moduleName = "../src/vector.js";
  var Vector = (function(x, y, z) {
    var self = {
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
          return $traceurRuntime.continuation(Vector, null, [y * c - z * b, z * a - x * c, x * b - y * a]);
        }, this, arguments);
      })),
      length: ($traceurRuntime.initTailRecursiveFunction(function() {
        return $traceurRuntime.call(function() {
          return $traceurRuntime.continuation(Math.sqrt, Math, [x * x + y * y + z * z]);
        }, this, arguments);
      })),
      direction: ($traceurRuntime.initTailRecursiveFunction(function() {
        return $traceurRuntime.call(function() {
          return $traceurRuntime.continuation(self.scale, self, [1 / self.length()]);
        }, this, arguments);
      })),
      scale: ($traceurRuntime.initTailRecursiveFunction(function(alpha) {
        return $traceurRuntime.call(function(alpha) {
          return $traceurRuntime.continuation(Vector, null, [x * alpha, y * alpha, z * alpha]);
        }, this, arguments);
      }))
    };
    return self;
  });
  var direction_from_to = ($traceurRuntime.initTailRecursiveFunction(function(start, finish) {
    return $traceurRuntime.call(function(start, finish) {
      return ($__2 = finish.sub(start), $traceurRuntime.continuation($__2.direction, $__2, []));
    }, this, arguments);
  }));
  return ($__0 = {}, Object.defineProperty($__0, "Vector", {
    get: function() {
      return Vector;
    },
    configurable: true,
    enumerable: true
  }), Object.defineProperty($__0, "direction_from_to", {
    get: function() {
      return direction_from_to;
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
  var $__0 = System.get("../src/vector.js"),
      direction_from_to = $__0.direction_from_to,
      Vector = $__0.Vector;
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
  var ray_from_to = ($traceurRuntime.initTailRecursiveFunction(function(start, finish) {
    return $traceurRuntime.call(function(start, finish) {
      return $traceurRuntime.continuation(Ray, null, [start, direction_from_to(start, finish)]);
    }, this, arguments);
  }));
  return ($__1 = {}, Object.defineProperty($__1, "Ray", {
    get: function() {
      return Ray;
    },
    configurable: true,
    enumerable: true
  }), Object.defineProperty($__1, "ray_from_to", {
    get: function() {
      return ray_from_to;
    },
    configurable: true,
    enumerable: true
  }), $__1);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/camera.js", [], function(require) {
  "use strict";
  var $__2;
  var __moduleName = "../src/camera.js";
  var $__0 = System.get("../src/vector.js"),
      direction_from_to = $__0.direction_from_to,
      Vector = $__0.Vector;
  var ray_from_to = System.get("../src/ray.js").ray_from_to;
  var Camera = (function($__3) {
    var $__5,
        $__6,
        $__8,
        $__9;
    var $__4 = $__3,
        origin = $__4.origin,
        look_at = ($__5 = $__4.look_at) === void 0 ? Vector(0, 0, 0) : $__5,
        pre_up = ($__6 = $__4.up) === void 0 ? Vector(0, 0, -1) : $__6,
        focus = $__4.focus,
        screen = $__4.screen;
    var $__7 = screen,
        screen_width = ($__8 = $__7[$traceurRuntime.toProperty($traceurRuntime.toProperty(Symbol.iterator))](), ($__9 = $__8.next()).done ? void 0 : $__9.value),
        screen_height = ($__9 = $__8.next()).done ? void 0 : $__9.value;
    var direction = direction_from_to(origin, look_at);
    var right = direction.cross(pre_up).direction();
    var up = right.cross(direction).direction();
    var center = origin.add(direction.scale(focus));
    return {cast_ray: ($traceurRuntime.initTailRecursiveFunction(function(x, y) {
        return $traceurRuntime.call(function(x, y) {
          var dx = x * screen_width / 2;
          var dy = y * screen_height / 2;
          var point_on_screen = center.add(right.scale(dx)).add(up.scale(dy));
          return $traceurRuntime.continuation(ray_from_to, null, [origin, point_on_screen]);
        }, this, arguments);
      }))};
  });
  return ($__2 = {}, Object.defineProperty($__2, "Camera", {
    get: function() {
      return Camera;
    },
    configurable: true,
    enumerable: true
  }), $__2);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/illuminator.js", [], function(require) {
  "use strict";
  var $__1;
  var __moduleName = "../src/illuminator.js";
  var colors = System.get("../src/color.js").colors;
  var Illuminator = (function(origin, color) {
    return {
      origin: origin,
      color: color
    };
  });
  return ($__1 = {}, Object.defineProperty($__1, "Illuminator", {
    get: function() {
      return Illuminator;
    },
    configurable: true,
    enumerable: true
  }), $__1);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/plain.js", [], function(require) {
  "use strict";
  var $__0;
  var __moduleName = "../src/plain.js";
  var Plain = (function(origin, dx, dy, color_a, color_b) {
    var normal = dx.cross(dy).direction();
    return {
      intersect: (function(ray) {
        var $__1 = ray,
            ro = $__1.origin,
            rd = $__1.direction;
        var p = rd.dot(normal);
        if (Math.abs(p) < 1e-5) {
          return -1;
        }
        var t = (origin.sub(ro)).dot(normal) / rd.dot(normal);
        if (t < 0) {
          return -1;
        }
        return t;
      }),
      normal_at: (function(point) {
        return normal;
      }),
      color_at: (function(point) {
        var p = point.sub(origin);
        var dx_ort = normal.cross(dx);
        var dy_ort = normal.cross(dy);
        var alpha = p.dot(dy_ort) / dx.dot(dy_ort);
        var beta = p.dot(dx_ort) / dy.dot(dx_ort);
        var odd = (function(x) {
          return ((x % 2) + 2) % 2 < 1 ? 0 : 1;
        });
        return [color_a, color_b][$traceurRuntime.toProperty(odd(alpha) ^ odd(beta))];
      })
    };
  });
  return ($__0 = {}, Object.defineProperty($__0, "Plain", {
    get: function() {
      return Plain;
    },
    configurable: true,
    enumerable: true
  }), $__0);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/result.js", [], function(require) {
  "use strict";
  var $__0;
  var __moduleName = "../src/result.js";
  var Result = {
    Ok: (function(result) {
      return {
        ok: true,
        result: result,
        then: ($traceurRuntime.initTailRecursiveFunction(function(f) {
          return $traceurRuntime.call(function(f) {
            var res = f(result);
            if ('ok' in res) {
              return res;
            } else {
              return $traceurRuntime.continuation(Result.Ok, Result, [res]);
            }
          }, this, arguments);
        }))
      };
    }),
    Fail: (function(message) {
      self = {
        ok: false,
        message: message,
        then: (function(f) {
          return self;
        })
      };
      return self;
    }),
    all: ($traceurRuntime.initTailRecursiveFunction(function(results) {
      return $traceurRuntime.call(function(results) {
        var $__1;
        if (results.length === 0) {
          return $traceurRuntime.continuation(Result.Ok, Result, [[]]);
        }
        var x = results[0];
        var xs = results.slice(1, results.length);
        return $traceurRuntime.continuation(x.then, x, [($traceurRuntime.initTailRecursiveFunction(function(xr) {
          return $traceurRuntime.call(function(xr) {
            return ($__1 = Result.all(xs), $traceurRuntime.continuation($__1.then, $__1, [(function(xrs) {
              xrs.unshift(xr);
              return xrs;
            })]));
          }, this, arguments);
        }))]);
      }, this, arguments);
    }))
  };
  return ($__0 = {}, Object.defineProperty($__0, "Result", {
    get: function() {
      return Result;
    },
    configurable: true,
    enumerable: true
  }), $__0);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/scene.js", [], function(require) {
  "use strict";
  var $__2;
  var __moduleName = "../src/scene.js";
  var colors = System.get("../src/color.js").colors;
  var Ray = System.get("../src/ray.js").Ray;
  var Scene = (function($__3) {
    var $__5;
    var $__4 = $__3,
        camera = $__4.camera,
        resolution = $__4.resolution,
        items = $__4.items,
        ambient = $__4.ambient,
        illuminators = $__4.illuminators,
        background_color = ($__5 = $__4.background_color) === void 0 ? colors.black : $__5;
    var _find_intersection = ($traceurRuntime.initTailRecursiveFunction(function(ray) {
      return $traceurRuntime.call(function(ray) {
        var f = (function(acc, item) {
          var t = item.intersect(ray);
          if (t != -1 && (acc.t == -1 || t < acc.t)) {
            return {
              t: t,
              item: item
            };
          }
          return acc;
        });
        return $traceurRuntime.continuation(items.reduce, items, [f, {
          t: -1,
          item: null
        }]);
      }, this, arguments);
    }));
    var _item_lighted_at = ($traceurRuntime.initTailRecursiveFunction(function(item, pos, viewer_dir) {
      return $traceurRuntime.call(function(item, pos, viewer_dir) {
        var f = ($traceurRuntime.initTailRecursiveFunction(function(color, illuminator) {
          return $traceurRuntime.call(function(color, illuminator) {
            var light_dir = (illuminator.origin.sub(pos)).direction();
            if (!_find_intersection(Ray(pos.add(light_dir.scale(1e-4)), light_dir)).item) {
              var normal = item.normal_at(pos);
              var diffuse_bright = normal.dot(light_dir);
              var diffuse_light = illuminator.color.set_bright(diffuse_bright);
              var reflected_dir = normal.scale(2 * light_dir.dot(normal)).sub(light_dir);
              var reflected_bright = Math.pow(reflected_dir.dot(viewer_dir), 2);
              var reflected_light = illuminator.color.set_bright(reflected_bright);
              var item_color = item.color_at(pos);
              var with_diffuse = color.mix_with(item_color.under_light(diffuse_light));
              return $traceurRuntime.continuation(with_diffuse.mix_with, with_diffuse, [item_color.under_light(reflected_light)]);
            }
            return color;
          }, this, arguments);
        }));
        var init_color = item.color_at(pos).under_light(ambient);
        return $traceurRuntime.continuation(illuminators.reduce, illuminators, [f, init_color]);
      }, this, arguments);
    }));
    var _reflect_ray = ($traceurRuntime.initTailRecursiveFunction(function(ray, intersect, normal) {
      return $traceurRuntime.call(function(ray, intersect, normal) {
        var dir = ray.direction;
        var reflected_dir = dir.sub(normal.scale(2 * dir.dot(normal)));
        return $traceurRuntime.continuation(Ray, null, [intersect.add(reflected_dir.scale(1e-4)), reflected_dir]);
      }, this, arguments);
    }));
    var _run_ray = (function(ray) {
      var $__6 = _find_intersection(ray),
          t = $__6.t,
          item = $__6.item;
      if (item) {
        var intersect = ray.point_along(t);
        var normal = item.normal_at(intersect);
        var color = _item_lighted_at(item, intersect, ray.direction.scale(-1));
        var reflected = _reflect_ray(ray, intersect, normal);
        return {
          color: color,
          reflected: reflected
        };
      } else {
        return {
          color: null,
          reflected: null
        };
      }
    });
    return {
      resolution: resolution,
      color_at: ($traceurRuntime.initTailRecursiveFunction(function(x, y) {
        return $traceurRuntime.call(function(x, y) {
          var $__7,
              $__8;
          var $__6 = resolution,
              res_x = ($__7 = $__6[$traceurRuntime.toProperty($traceurRuntime.toProperty(Symbol.iterator))](), ($__8 = $__7.next()).done ? void 0 : $__8.value),
              res_y = ($__8 = $__7.next()).done ? void 0 : $__8.value;
          var dx = (2 * x - res_x) / res_x;
          var dy = (2 * y - res_y) / res_y;
          var ray = camera.cast_ray(dx, dy);
          var $__9 = _run_ray(ray),
              color = $__9.color,
              reflected = $__9.reflected;
          if (color) {
            var $__10 = _run_ray(reflected),
                mirrored_color = $__10.color,
                _ = $__10._;
            if (mirrored_color) {
              return $traceurRuntime.continuation(color.mix_with, color, [mirrored_color.set_bright(0.3)]);
            }
            return color;
          }
          return background_color;
        }, this, arguments);
      }))
    };
  });
  return ($__2 = {}, Object.defineProperty($__2, "Scene", {
    get: function() {
      return Scene;
    },
    configurable: true,
    enumerable: true
  }), $__2);
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
  var $__3;
  var __moduleName = "../src/sphere.js";
  var Vector = System.get("../src/vector.js").Vector;
  var $__1 = System.get("../src/ray.js"),
      Ray = $__1.Ray,
      ray_from_to = $__1.ray_from_to;
  var solve_square_equation = System.get("../src/utils.js").solve_square_equation;
  var Sphere = (function(center, radius, color) {
    var $__6;
    return {
      center: center,
      radius: radius,
      intersect: (function(ray) {
        var $__5;
        var $__4 = ray,
            o = $__4.origin,
            d = $__4.direction;
        var a = d.dot(d);
        var b = 2 * d.dot(o.sub(center));
        var c = o.sub(center).dot(o.sub(center));
        var roots = solve_square_equation(a, b, c - radius * radius);
        roots = roots.filter((function(x) {
          return x >= 0;
        }));
        var t = ($__5 = Math).min.apply($__5, $traceurRuntime.spread(roots));
        if (t < Infinity) {
          return t;
        } else {
          return -1;
        }
      }),
      normal_at: ($traceurRuntime.initTailRecursiveFunction(function(point) {
        return $traceurRuntime.call(function(point) {
          return ($__6 = point.sub(center), $traceurRuntime.continuation($__6.direction, $__6, []));
        }, this, arguments);
      })),
      color_at: (function(point) {
        return color;
      })
    };
  });
  var test_normal_at = (function() {
    var s = Sphere(Vector(0, 0, 0), 1);
    console.log(s.normal_at(Vector(1, 0, 0)));
  });
  var test = (function() {
    var origin = Vector(0, 0, 0);
    var radius = 1;
    var s = Sphere(origin, radius);
    var p = Vector(10, 0, 0);
    var r = ray_from_to(p, origin);
    console.log(s.intersect(r));
  });
  return ($__3 = {}, Object.defineProperty($__3, "Sphere", {
    get: function() {
      return Sphere;
    },
    configurable: true,
    enumerable: true
  }), $__3);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/scene_builder.js", [], function(require) {
  "use strict";
  var $__13,
      $__18,
      $__17,
      $__23;
  var $__8;
  var __moduleName = "../src/scene_builder.js";
  var Plain = System.get("../src/plain.js").Plain;
  var Sphere = System.get("../src/sphere.js").Sphere;
  var Vector = System.get("../src/vector.js").Vector;
  var $__3 = System.get("../src/color.js"),
      Color = $__3.Color,
      colors = $__3.colors;
  var Result = System.get("../src/result.js").Result;
  var Scene = System.get("../src/scene.js").Scene;
  var Camera = System.get("../src/camera.js").Camera;
  var Illuminator = System.get("../src/illuminator.js").Illuminator;
  var build_from_json = ($traceurRuntime.initTailRecursiveFunction(function(conf) {
    return $traceurRuntime.call(function(conf) {
      return ($__13 = extract(conf, {
        camera: build_camera,
        items: [build_item],
        illuminators: [build_illuminator],
        resolution: null,
        ambient: build_color
      }), $traceurRuntime.continuation($__13.then, $__13, [Scene]));
    }, this, arguments);
  }));
  var extract = ($traceurRuntime.initTailRecursiveFunction(function(obj, fs) {
    return $traceurRuntime.call(function(obj, fs) {
      var $__16,
          $__17;
      var get_key = ($traceurRuntime.initTailRecursiveFunction(function(key) {
        return $traceurRuntime.call(function(key) {
          var $__15;
          if (!($traceurRuntime.toProperty(key) in obj)) {
            return $traceurRuntime.continuation(Result.Fail, Result, ["no " + key + " key!"]);
          }
          var value = obj[$traceurRuntime.toProperty(key)];
          var f = fs[$traceurRuntime.toProperty(key)];
          if (f === null) {
            return $traceurRuntime.continuation(Result.Ok, Result, [[key, value]]);
          }
          if (f.constructor === Array) {
            if (value.constructor !== Array) {
              return $traceurRuntime.continuation(Result.Fail, Result, ["expected array in " + key]);
            }
            return ($__16 = Result.all(value.map(($traceurRuntime.initTailRecursiveFunction(function(x) {
              return $traceurRuntime.call(function(x) {
                return ($__15 = Result.Ok(x), $traceurRuntime.continuation($__15.then, $__15, [f[0]]));
              }, this, arguments);
            })))), $traceurRuntime.continuation($__16.then, $__16, [($traceurRuntime.initTailRecursiveFunction(function(xs) {
              return $traceurRuntime.call(function(xs) {
                return $traceurRuntime.continuation(Result.Ok, Result, [[key, xs]]);
              }, this, arguments);
            }))]));
          }
          return ($__17 = Result.Ok(value).then(f), $traceurRuntime.continuation($__17.then, $__17, [($traceurRuntime.initTailRecursiveFunction(function(x) {
            return $traceurRuntime.call(function(x) {
              return $traceurRuntime.continuation(Result.Ok, Result, [[key, x]]);
            }, this, arguments);
          }))]));
        }, this, arguments);
      }));
      var tmp = Object.keys(fs).map(get_key);
      return ($__18 = Result.all(Object.keys(fs).map(get_key)), $traceurRuntime.continuation($__18.then, $__18, [($traceurRuntime.initTailRecursiveFunction(function(props) {
        return $traceurRuntime.call(function(props) {
          return $traceurRuntime.continuation(props.reduce, props, [((function(acc, $__9) {
            var $__11,
                $__12;
            var $__10 = $__9,
                key = ($__11 = $__10[$traceurRuntime.toProperty($traceurRuntime.toProperty(Symbol.iterator))](), ($__12 = $__11.next()).done ? void 0 : $__12.value),
                value = ($__12 = $__11.next()).done ? void 0 : $__12.value;
            acc[$traceurRuntime.toProperty(key)] = value;
            return acc;
          })), {}]);
        }, this, arguments);
      }))]));
    }, this, arguments);
  }));
  var get = ($traceurRuntime.initTailRecursiveFunction(function(obj, key) {
    return $traceurRuntime.call(function(obj, key) {
      if (!($traceurRuntime.toProperty(key) in obj)) {
        return $traceurRuntime.continuation(Result.Fail, Result, ["No " + key + " key in object " + JSON.stringify(obj)]);
      }
      return $traceurRuntime.continuation(Result.Ok, Result, [obj[$traceurRuntime.toProperty(key)]]);
    }, this, arguments);
  }));
  var build_item = ($traceurRuntime.initTailRecursiveFunction(function(conf) {
    return $traceurRuntime.call(function(conf) {
      return ($__17 = get(conf, 'type'), $traceurRuntime.continuation($__17.then, $__17, [($traceurRuntime.initTailRecursiveFunction(function(type) {
        return $traceurRuntime.call(function(type) {
          switch (type) {
            case "sphere":
              return $traceurRuntime.continuation(build_sphere, null, [conf]);
            case "plain":
              return $traceurRuntime.continuation(build_plain, null, [conf]);
            default:
              return $traceurRuntime.continuation(Result.Fail, Result, ["unknown item type " + type]);
          }
        }, this, arguments);
      }))]));
    }, this, arguments);
  }));
  var build_sphere = ($traceurRuntime.initTailRecursiveFunction(function(conf) {
    return $traceurRuntime.call(function(conf) {
      return $traceurRuntime.continuation(Sphere, null, [build_vector(conf.origin), conf.radius, build_color(conf.color)]);
    }, this, arguments);
  }));
  var build_plain = ($traceurRuntime.initTailRecursiveFunction(function(conf) {
    return $traceurRuntime.call(function(conf) {
      return $traceurRuntime.continuation(Plain, null, [build_vector(conf.origin), build_vector(conf.dx), build_vector(conf.dy), build_color(conf.colorx), build_color(conf.colory)]);
    }, this, arguments);
  }));
  var build_illuminator = ($traceurRuntime.initTailRecursiveFunction(function(conf) {
    return $traceurRuntime.call(function(conf) {
      return $traceurRuntime.continuation(Illuminator, null, [build_vector(conf.origin), build_color(conf.color)]);
    }, this, arguments);
  }));
  var build_camera = ($traceurRuntime.initTailRecursiveFunction(function(conf) {
    return $traceurRuntime.call(function(conf) {
      return ($__23 = extract(conf, {
        origin: build_vector,
        look_at: build_vector,
        focus: null,
        screen: null
      }), $traceurRuntime.continuation($__23.then, $__23, [Camera]));
    }, this, arguments);
  }));
  var build_color = ($traceurRuntime.initTailRecursiveFunction(function(conf) {
    return $traceurRuntime.call(function(conf) {
      if (is_string(conf)) {
        return colors[$traceurRuntime.toProperty(conf)];
      } else {
        return $traceurRuntime.continuation(Color.apply, Color, [(void 0), $traceurRuntime.spread(conf)]);
      }
    }, this, arguments);
  }));
  var is_string = (function(s) {
    return typeof s === 'string' || s instanceof String;
  });
  var build_vector = ($traceurRuntime.initTailRecursiveFunction(function(conf) {
    return $traceurRuntime.call(function(conf) {
      return $traceurRuntime.continuation(Vector.apply, Vector, [(void 0), $traceurRuntime.spread(conf)]);
    }, this, arguments);
  }));
  return ($__8 = {}, Object.defineProperty($__8, "build_from_json", {
    get: function() {
      return build_from_json;
    },
    configurable: true,
    enumerable: true
  }), $__8);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/screen.js", [], function(require) {
  "use strict";
  var $__0;
  var __moduleName = "../src/screen.js";
  var Screen = (function(canvas_selection) {
    var canvas = canvas_selection[0];
    var ctx = canvas.getContext("2d");
    var width = canvas_selection.attr('width');
    var height = canvas_selection.attr('height');
    var resolution = [width, height];
    ctx.fillRect(0, 0, width, height);
    return {
      canvas: canvas,
      ctx: ctx,
      resolution: resolution,
      put_pixel: (function(x, y, color) {
        ctx.fillStyle = color.as_rgba_str();
        ctx.fillRect(x, y, 1, 1);
      }),
      update: (function() {
        console.log("screen update now");
      })
    };
  });
  return ($__0 = {}, Object.defineProperty($__0, "Screen", {
    get: function() {
      return Screen;
    },
    configurable: true,
    enumerable: true
  }), $__0);
});
$traceurRuntime.options.symbols = true;
System.registerModule("../src/main.js", [], function(require) {
  "use strict";
  var __moduleName = "../src/main.js";
  var Color = System.get("../src/color.js").Color;
  var Vector = System.get("../src/vector.js").Vector;
  var Screen = System.get("../src/screen.js").Screen;
  var build_from_json = System.get("../src/scene_builder.js").build_from_json;
  var default_config = {
    resolution: [64 * 1, 48 * 1],
    camera: {
      origin: [10, 0, 1.5],
      look_at: [0, 0, 1.5],
      focus: 5,
      screen: [6.4, 4.8]
    },
    ambient: [0.2, 0.2, 0.2],
    items: [{
      type: "sphere",
      origin: [0, 0, 1],
      radius: 1,
      color: "red"
    }, {
      type: "plain",
      origin: [0, 0, 0],
      dx: [1, 0, 0],
      dy: [0, 1, 0],
      colorx: "blue",
      colory: "white"
    }],
    illuminators: [{
      origin: [1, -2, 2],
      color: "white"
    }]
  };
  var ui = {
    canvas: null,
    start_button: null,
    description: null
  };
  var init_ui = (function() {
    window.ui = ui;
    ui.canvas = $("#screen");
    ui.start_button = $('.start-button');
    ui.description = $('.scene-description');
    ui.description.val(JSON.stringify(default_config, null, 4));
    ui.start_button.on('click', on_start_button);
  });
  var on_start_button = (function() {
    var $__6,
        $__7;
    var text = ui.description.val();
    var json = null;
    try {
      json = JSON.parse(text);
    } catch (SyntaxErorr) {
      alert("Malformed config");
      return ;
    }
    var $__4 = build_from_json(json),
        ok = $__4.ok,
        scene = $__4.result,
        message = $__4.message;
    if (!ok) {
      alert(message);
    } else {
      var $__5 = scene.resolution,
          width = ($__6 = $__5[$traceurRuntime.toProperty($traceurRuntime.toProperty(Symbol.iterator))](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
          height = ($__7 = $__6.next()).done ? void 0 : $__7.value;
      ui.canvas.width(width);
      ui.canvas.height(height);
      ui.canvas.attr({
        width: width,
        height: height
      });
      var screen = Screen(ui.canvas);
      render_scene(json, screen);
    }
  });
  $((function() {
    init_ui();
  }));
  var render_scene = (function(json, screen) {
    var $__5,
        $__8;
    var n_done = 0;
    var on_message = (function(e) {
      var $__6,
          $__7,
          $__9,
          $__10,
          $__12,
          $__13;
      if (e.data === "Done!") {
        n_done++;
        if (n_done === n_workers) {
          var end_time = performance.now();
          console.log("...done!");
          console.log((end_time - start_time) / 1000, 'seconds');
        }
        return ;
      }
      var $__5 = e.data,
          $__8 = ($__6 = $__5[$traceurRuntime.toProperty($traceurRuntime.toProperty(Symbol.iterator))](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
          x = ($__9 = $__8[$traceurRuntime.toProperty($traceurRuntime.toProperty(Symbol.iterator))](), ($__10 = $__9.next()).done ? void 0 : $__10.value),
          y = ($__10 = $__9.next()).done ? void 0 : $__10.value,
          $__11 = ($__7 = $__6.next()).done ? void 0 : $__7.value,
          r = ($__12 = $__11[$traceurRuntime.toProperty($traceurRuntime.toProperty(Symbol.iterator))](), ($__13 = $__12.next()).done ? void 0 : $__13.value),
          g = ($__13 = $__12.next()).done ? void 0 : $__13.value,
          b = ($__13 = $__12.next()).done ? void 0 : $__13.value;
      screen.put_pixel(x, y, Color(r, g, b));
    });
    var n_workers = 8;
    var $__4 = screen.resolution,
        width = ($__5 = $__4[$traceurRuntime.toProperty($traceurRuntime.toProperty(Symbol.iterator))](), ($__8 = $__5.next()).done ? void 0 : $__8.value),
        height = ($__8 = $__5.next()).done ? void 0 : $__8.value;
    var block = Math.floor(width / n_workers);
    console.log("Start rendering...");
    var start_time = performance.now();
    for (var i = 0; i < n_workers; i++) {
      var lo = i * block;
      var hi = i === n_workers - 1 ? width : (i + 1) * block;
      var x_range = [lo, hi];
      var y_range = [0, height];
      var w = new Worker('js/worker.js');
      w.onmessage = on_message;
      w.postMessage({
        json: json,
        x_range: x_range,
        y_range: y_range
      });
    }
  });
  return {};
});
System.get("../src/main.js" + '');
