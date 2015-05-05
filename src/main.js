import {Vector} from './vector.js'
import {Camera} from './camera.js'
import {Scene} from './scene.js'
import {Sphere} from './sphere.js'
import {Screen} from './screen.js'
import {Illuminator} from './illuminator.js'
import {colors} from './color.js'

$(() => {

  const camera = Camera({
    origin: Vector(10, 0, 0),
    focus: 5,
    screen: [6.4, 4.8]
  })

  const items = [
    Sphere(Vector(0,  0, 0), 1, colors.red),
    Sphere(Vector(0,  1, 0), 1, colors.blue)
  ]

  const illuminators = [
    Illuminator(Vector(-1, -2, -2), colors.white.set_bright(0.5)),
    Illuminator(Vector(1,  2,  2), colors.green.set_bright(0.5))
  ]

  const width = 64 * 8
  const height = 48 * 8

  const scene = Scene({
    camera,
    resolution: [width, height],
    items,
    ambient: colors.white.set_bright(0.3),
    illuminators
  })

  const canvas = $("#screen")[0]
  const screen = Screen(canvas, [width, height])

  const start_time = performance.now();
  console.log("Start rendering...")
  for (let x = 0; x < scene.resolution[0]; x++) {
    for (let y = 0; y < scene.resolution[1]; y++) {
      screen.put_pixel(x, y, scene.color_at(x, y))
    }
  }
  console.log("...done!")
  const end_time = performance.now();
  console.log('It took ' + (end_time - start_time) + ' ms.');
})
