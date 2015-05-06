System.registerModule("../src/vector.js", [], function() {
  "use strict";
  var __moduleName = "../src/vector.js";
  var Vector = (function(x, y, z) {
    var self = {
      x: x,
      y: y,
      z: z,
      add: (function(rhs) {
        return Vector(x + rhs.x, y + rhs.y, z + rhs.z);
      }),
      sub: (function(rhs) {
        return Vector(x - rhs.x, y - rhs.y, z - rhs.z);
      }),
      dot: (function(rhs) {
        return x * rhs.x + y * rhs.y + z * rhs.z;
      }),
      cross: (function(rhs) {
        var $__0 = rhs,
            a = $__0.x,
            b = $__0.y,
            c = $__0.z;
        return Vector(y * c - z * b, z * a - x * c, x * b - y * a);
      }),
      length: (function() {
        return Math.sqrt(x * x + y * y + z * z);
      }),
      direction: (function() {
        return self.scale(1 / self.length());
      }),
      scale: (function(alpha) {
        return Vector(x * alpha, y * alpha, z * alpha);
      })
    };
    return self;
  });
  var direction_from_to = (function(start, finish) {
    return finish.sub(start).direction();
  });
  return {
    get Vector() {
      return Vector;
    },
    get direction_from_to() {
      return direction_from_to;
    }
  };
});
System.registerModule("../src/ray.js", [], function() {
  "use strict";
  var __moduleName = "../src/ray.js";
  var $__0 = System.get("../src/vector.js"),
      direction_from_to = $__0.direction_from_to,
      Vector = $__0.Vector;
  var Ray = (function(origin, direction) {
    return {
      origin: origin,
      direction: direction,
      point_along: (function(t) {
        return origin.add(direction.scale(t));
      })
    };
  });
  var ray_from_to = (function(start, finish) {
    return Ray(start, direction_from_to(start, finish));
  });
  return {
    get Ray() {
      return Ray;
    },
    get ray_from_to() {
      return ray_from_to;
    }
  };
});
System.registerModule("../src/camera.js", [], function() {
  "use strict";
  var __moduleName = "../src/camera.js";
  var $__0 = System.get("../src/vector.js"),
      direction_from_to = $__0.direction_from_to,
      Vector = $__0.Vector;
  var ray_from_to = System.get("../src/ray.js").ray_from_to;
  var Camera = (function($__2) {
    var $__4,
        $__5,
        $__7,
        $__8;
    var $__3 = $__2,
        origin = $__3.origin,
        look_at = ($__4 = $__3.look_at) === void 0 ? Vector(0, 0, 0) : $__4,
        pre_up = ($__5 = $__3.up) === void 0 ? Vector(0, 0, -1) : $__5,
        focus = $__3.focus,
        screen = $__3.screen;
    var $__6 = screen,
        screen_width = ($__7 = $__6[$traceurRuntime.toProperty(Symbol.iterator)](), ($__8 = $__7.next()).done ? void 0 : $__8.value),
        screen_height = ($__8 = $__7.next()).done ? void 0 : $__8.value;
    var direction = direction_from_to(origin, look_at);
    var right = direction.cross(pre_up).direction();
    var up = right.cross(direction).direction();
    var center = origin.add(direction.scale(focus));
    return {cast_ray: (function(x, y) {
        var dx = x * screen_width / 2;
        var dy = y * screen_height / 2;
        var point_on_screen = center.add(right.scale(dx)).add(up.scale(dy));
        return ray_from_to(origin, point_on_screen);
      })};
  });
  return {get Camera() {
      return Camera;
    }};
});
System.registerModule("../src/color.js", [], function() {
  "use strict";
  var __moduleName = "../src/color.js";
  var Color = (function(r, g, b) {
    return {
      r: r,
      g: g,
      b: b,
      as_rgba_str: (function() {
        var f = (function(alpha) {
          return Math.min(Math.round((alpha * 255)), 255);
        });
        return "rgba(" + f(r) + "," + f(g) + "," + f(b) + "," + 255 + ")";
      }),
      under_light: (function(light) {
        return Color(r * light.r, g * light.g, b * light.b);
      }),
      mix_with: (function(other) {
        return Color(r + other.r, g + other.g, b + other.b);
      }),
      set_bright: (function(bright) {
        return Color(r * bright, g * bright, b * bright);
      })
    };
  });
  var colors = {
    white: Color(0.9, 0.9, 0.9),
    black: Color(0.1, 0.1, 0.1),
    red: Color(0.9, 0.1, 0.1),
    green: Color(0.1, 0.9, 0.1),
    blue: Color(0.1, 0.1, 0.9)
  };
  return {
    get Color() {
      return Color;
    },
    get colors() {
      return colors;
    }
  };
});
System.registerModule("../src/illuminator.js", [], function() {
  "use strict";
  var __moduleName = "../src/illuminator.js";
  var colors = System.get("../src/color.js").colors;
  var Illuminator = (function(origin, color) {
    return {
      origin: origin,
      color: color
    };
  });
  return {get Illuminator() {
      return Illuminator;
    }};
});
System.registerModule("../src/plain.js", [], function() {
  "use strict";
  var __moduleName = "../src/plain.js";
  var Plain = (function(origin, dx, dy, color_a, color_b) {
    var normal = dx.cross(dy).direction();
    return {
      intersect: (function(ray) {
        var $__0 = ray,
            ro = $__0.origin,
            rd = $__0.direction;
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
        return [color_a, color_b][odd(alpha) ^ odd(beta)];
      })
    };
  });
  return {get Plain() {
      return Plain;
    }};
});
System.registerModule("../src/result.js", [], function() {
  "use strict";
  var __moduleName = "../src/result.js";
  var Result = {
    Ok: (function(result) {
      return {
        ok: true,
        result: result,
        then: (function(f) {
          var res = f(result);
          if ('ok' in res) {
            return res;
          } else {
            return Result.Ok(res);
          }
        })
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
    all: (function(results) {
      if (results.length === 0) {
        return Result.Ok([]);
      }
      var x = results[0];
      var xs = results.slice(1, results.length);
      return x.then((function(xr) {
        return Result.all(xs).then((function(xrs) {
          xrs.unshift(xr);
          return xrs;
        }));
      }));
    })
  };
  return {get Result() {
      return Result;
    }};
});
System.registerModule("../src/scene.js", [], function() {
  "use strict";
  var __moduleName = "../src/scene.js";
  var colors = System.get("../src/color.js").colors;
  var Ray = System.get("../src/ray.js").Ray;
  var Scene = (function($__2) {
    var $__4;
    var $__3 = $__2,
        camera = $__3.camera,
        resolution = $__3.resolution,
        items = $__3.items,
        ambient = $__3.ambient,
        illuminators = $__3.illuminators,
        background_color = ($__4 = $__3.background_color) === void 0 ? colors.black : $__4;
    var _find_intersection = (function(ray) {
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
      return items.reduce(f, {
        t: -1,
        item: null
      });
    });
    var _item_lighted_at = (function(item, pos, viewer_dir) {
      var f = (function(color, illuminator) {
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
          return with_diffuse.mix_with(item_color.under_light(reflected_light));
        }
        return color;
      });
      var init_color = item.color_at(pos).under_light(ambient);
      return illuminators.reduce(f, init_color);
    });
    var _reflect_ray = (function(ray, intersect, normal) {
      var dir = ray.direction;
      var reflected_dir = dir.sub(normal.scale(2 * dir.dot(normal)));
      return Ray(intersect.add(reflected_dir.scale(1e-4)), reflected_dir);
    });
    var _run_ray = (function(ray) {
      var $__5 = _find_intersection(ray),
          t = $__5.t,
          item = $__5.item;
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
      color_at: (function(x, y) {
        var $__6,
            $__7;
        var $__5 = resolution,
            res_x = ($__6 = $__5[$traceurRuntime.toProperty(Symbol.iterator)](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            res_y = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        var dx = (2 * x - res_x) / res_x;
        var dy = (2 * y - res_y) / res_y;
        var ray = camera.cast_ray(dx, dy);
        var $__8 = _run_ray(ray),
            color = $__8.color,
            reflected = $__8.reflected;
        if (color) {
          var $__9 = _run_ray(reflected),
              mirrored_color = $__9.color,
              _ = $__9._;
          if (mirrored_color) {
            return color.mix_with(mirrored_color.set_bright(0.3));
          }
          return color;
        }
        return background_color;
      })
    };
  });
  return {get Scene() {
      return Scene;
    }};
});
System.registerModule("../src/utils.js", [], function() {
  "use strict";
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
  return {get solve_square_equation() {
      return solve_square_equation;
    }};
});
System.registerModule("../src/sphere.js", [], function() {
  "use strict";
  var __moduleName = "../src/sphere.js";
  var Vector = System.get("../src/vector.js").Vector;
  var $__1 = System.get("../src/ray.js"),
      Ray = $__1.Ray,
      ray_from_to = $__1.ray_from_to;
  var solve_square_equation = System.get("../src/utils.js").solve_square_equation;
  var Sphere = (function(center, radius, color) {
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
      normal_at: (function(point) {
        return point.sub(center).direction();
      }),
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
  return {get Sphere() {
      return Sphere;
    }};
});
System.registerModule("../src/scene_builder.js", [], function() {
  "use strict";
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
  var build_from_json = (function(conf) {
    return extract(conf, {
      camera: build_camera,
      items: [build_item],
      illuminators: [build_illuminator],
      resolution: null,
      ambient: build_color
    }).then(Scene);
  });
  var extract = (function(obj, fs) {
    var get_key = (function(key) {
      if (!(key in obj)) {
        return Result.Fail("no " + key + " key!");
      }
      var value = obj[key];
      var f = fs[key];
      if (f === null) {
        return Result.Ok([key, value]);
      }
      if (f.constructor === Array) {
        if (value.constructor !== Array) {
          return Result.Fail("expected array in " + key);
        }
        return Result.all(value.map((function(x) {
          return Result.Ok(x).then(f[0]);
        }))).then((function(xs) {
          return Result.Ok([key, xs]);
        }));
      }
      return Result.Ok(value).then(f).then((function(x) {
        return Result.Ok([key, x]);
      }));
    });
    var tmp = Object.keys(fs).map(get_key);
    return Result.all(Object.keys(fs).map(get_key)).then((function(props) {
      return props.reduce(((function(acc, $__8) {
        var $__10,
            $__11;
        var $__9 = $__8,
            key = ($__10 = $__9[$traceurRuntime.toProperty(Symbol.iterator)](), ($__11 = $__10.next()).done ? void 0 : $__11.value),
            value = ($__11 = $__10.next()).done ? void 0 : $__11.value;
        acc[key] = value;
        return acc;
      })), {});
    }));
  });
  var get = (function(obj, key) {
    if (!(key in obj)) {
      return Result.Fail("No " + key + " key in object " + JSON.stringify(obj));
    }
    return Result.Ok(obj[key]);
  });
  var build_item = (function(conf) {
    return get(conf, 'type').then((function(type) {
      switch (type) {
        case "sphere":
          return build_sphere(conf);
        case "plain":
          return build_plain(conf);
        default:
          return Result.Fail("unknown item type " + type);
      }
    }));
  });
  var build_sphere = (function(conf) {
    return Sphere(build_vector(conf.origin), conf.radius, build_color(conf.color));
  });
  var build_plain = (function(conf) {
    return Plain(build_vector(conf.origin), build_vector(conf.dx), build_vector(conf.dy), build_color(conf.colorx), build_color(conf.colory));
  });
  var build_illuminator = (function(conf) {
    return Illuminator(build_vector(conf.origin), build_color(conf.color));
  });
  var build_camera = (function(conf) {
    return extract(conf, {
      origin: build_vector,
      look_at: build_vector,
      focus: null,
      screen: null
    }).then(Camera);
  });
  var build_color = (function(conf) {
    if (is_string(conf)) {
      return colors[conf];
    } else {
      return Color.apply((void 0), $traceurRuntime.spread(conf));
    }
  });
  var is_string = (function(s) {
    return typeof s === 'string' || s instanceof String;
  });
  var build_vector = (function(conf) {
    return Vector.apply((void 0), $traceurRuntime.spread(conf));
  });
  return {get build_from_json() {
      return build_from_json;
    }};
});
System.registerModule("../src/worker.js", [], function() {
  "use strict";
  var __moduleName = "../src/worker.js";
  var build_from_json = System.get("../src/scene_builder.js").build_from_json;
  onmessage = (function(e) {
    var $__1 = e.data,
        json = $__1.json,
        x_range = $__1.x_range,
        y_range = $__1.y_range;
    var scene = build_from_json(json).result;
    var start_time = performance.now();
    for (var x = x_range[0]; x < x_range[1]; x++) {
      for (var y = y_range[0]; y < y_range[1]; y++) {
        var c = scene.color_at(x, y);
        postMessage([[x, y], [c.r, c.g, c.b]]);
      }
    }
    postMessage("Done!");
    close();
  });
  return {};
});
System.get("../src/worker.js" + '');
