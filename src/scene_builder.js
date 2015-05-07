import {Plain} from './plain.js'
import {Sphere} from './sphere.js'
import {Triangle} from './triangle.js'
import {Vector} from './vector.js'
import {Color, colors} from './color.js'
import {Result} from './result.js'
import {Scene} from './scene.js'
import {Camera} from './camera.js'
import {Illuminator} from './illuminator.js'


export const build_from_json = (conf) => {
  return extract(conf, {
    camera: build_camera,
    items: [build_item],
    illuminators: [build_illuminator],
    resolution: null,
    ambient: build_color,
    upsampling: null
  }).then(Scene)
}

const extract = (obj, fs) => {
  const get_key = (key) => {
    if (!(key in obj)) {
      return Result.Fail("no " + key + " key!")
    }
    const value = obj[key]
    const f = fs[key]
    if (f === null) {
      return Result.Ok([key, value])
    }
    if (f.constructor === Array) {
      if (value.constructor !== Array) {
        return Result.Fail("expected array in " + key)
      }
      return Result.all(value.map((x) => Result.Ok(x).then(f[0])))
        .then((xs) => Result.Ok([key, xs]))
    }
    return Result.Ok(value)
      .then(f)
      .then((x) => Result.Ok([key, x]))
  }
  const tmp = Object.keys(fs).map(get_key)
  return Result
    .all(Object.keys(fs).map(get_key))
    .then((props) => props.reduce(
      ((acc, [key, value]) => {
        acc[key] = value
        return acc
      }), {}))
}

const get = (obj, key) => {
  if (!(key in obj)) {
    return Result.Fail("No " + key + " key in object " + JSON.stringify(obj))
  }
  return Result.Ok(obj[key])
}

const build_item = (conf) =>
  get(conf, 'type').then((type) => {
    switch (type) {
    case "sphere": return build_sphere(conf)
    case "plain": return build_plain(conf)
    case "triangle": return build_triangle(conf)
    default:
      return Result.Fail("unknown item type " + type)
    }
  })


const build_sphere = (conf) => Sphere(
  build_vector(conf.origin), conf.radius, build_color(conf.color)
)


const build_plain = (conf) => Plain(
  build_vector(conf.origin), build_vector(conf.dx), build_vector(conf.dy),
  build_color(conf.colorx), build_color(conf.colory)
)

const build_triangle = (conf) => Triangle(
  build_vector(conf.a),
  build_vector(conf.b),
  build_vector(conf.c),
  build_color(conf.color)
)

const build_illuminator = (conf) => Illuminator(
  build_vector(conf.origin), build_color(conf.color)
)


const build_camera = (conf) =>
        extract(conf, {
          origin: build_vector,
          look_at: build_vector,
          focus: null,
          screen: null
        }).then(Camera)


const build_color = (conf) => {
  if (is_string(conf)) {
    return colors[conf]
  } else {
    return Color(...conf)
  }
}


const is_string = (s) =>
        typeof s === 'string' || s instanceof String


const build_vector = (conf) => Vector(...conf)
