import {Vector} from './vector.js'
import {Camera} from './camera.js'
import {Scene} from './scene.js'
import {Sphere} from './sphere.js'
import {Item} from './item.js'
import {colors} from './color.js'

$(() => {

  const camera = Camera({
    origin: Vector(10, 0, 0),
    focus: 5,
    screen: [6.4, 4.8]
  })

  const objects = [
    Item(Sphere(Vector(0, 0, 0), 1), colors.red)
  ]

  const width = 64 * 4
  const height = 48 * 4

  const scene = Scene({
    camera,
    resolution: [width, height],
    objects
  })

  const canvas = $("#screen")[0]
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext("2d")
  ctx.fillRect(0, 0, width, height)

  console.log("Start rendering...")
  for (let x = 0; x < scene.resolution[0]; x++) {
    for (let y = 0; y < scene.resolution[1]; y++) {
      const c = scene.color_at(x, y)
      ctx.fillStyle = c.as_rgba_str()
      ctx.fillRect(x, y, 1, 1)
    }
  }
  console.log("...done!")

})
