import {Plain} from './plain.js'
import {Sphere} from './sphere.js'
import {Vector} from './vector.js'
import {Color, colors} from './color.js'
import {Result} from './result.js'
import {Scene} from './scene.js'
import {Camera} from './camera.js'
import {Illuminator} from './illuminator.js'


export const build_from_json = (str) => {
  let conf = null
  try {
    conf = JSON.parse(str)
  } catch (SyntaxError) {
    return Result.Fail("You shall not parse")
  }

  return extract(conf, {
    camera: build_camera,
    items: [build_item],
    illuminators: [build_illuminator],
    resolution: null,
    ambient: build_color
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
  if (key in obj) {
    return Result.Fail("No " + key + " key in object " + obj)
  }
  return Result.Ok(obj.key)
}


const build_item = (conf) => {
  switch (conf.type) {
  case "sphere": return build_sphere(conf)
  case "plain": return build_plain(conf)
  default:
    // MAKE ME A MONAD, PLEASE!!!
  }
}


const build_sphere = (conf) => Sphere(
  build_vector(conf.origin), conf.radius, build_color(conf.color)
)


const build_plain = (conf) => Plain(
  build_vector(conf.origin), build_vector(conf.dx), build_vector(conf.dy),
  build_color(conf.colorx), build_color(conf.colory)
)


const build_illuminator = (conf) => Illuminator(
  build_vector(conf.origin), build_color(conf.color)
)


const build_camera = (conf) => Camera({
  origin: build_vector(conf.origin),
  look_at: build_vector(conf.look_at),
  focus: conf.focus,
  screen: conf.screen
})


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
