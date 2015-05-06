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

  const camera = build_camera(conf.camera)
  const items = conf.items.map(build_item)
  const illuminators = conf.illuminators.map(build_illuminator)

  return Scene({
    camera,
    resolution: conf.resolution,
    items,
    ambient: build_color(conf.ambient),
    illuminators
  })
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
