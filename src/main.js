import {Vector} from './vector.js'
import {Camera} from './camera.js'
import {Scene} from './scene.js'
import {Sphere} from './sphere.js'
import {Plain} from './plain.js'
import {Screen} from './screen.js'
import {colors} from './color.js'

$(() => {

  const camera = Camera({
    origin: Vector(10, 0, 1.5),
    look_at: Vector(0, 0, 1.5),
    focus: 5,
    screen: [6.4, 4.8]
  })

  const items = [
    Sphere(Vector(0, 0, 1), 1, colors.red),
    Sphere(Vector(2, -1, 1), 1, colors.blue),
    Plain(Vector(0, 0, 0), Vector(0, 1, 0), Vector(1, 0, 0),
          colors.blue, colors.white)
  ]

  const width = 64 * 4
  const height = 48 * 4

  const scene = Scene({
    camera,
    resolution: [width, height],
    items,
    ambient: colors.white,
    illuminators: []
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
