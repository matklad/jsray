import {Vector} from './vector.js'
import {Screen} from './screen.js'
import {build_from_json} from './scene_builder.js'

$(() => {

  const config =  {
    resolution: [64 * 4,
                 48 * 4],

    camera: {
      origin: [10, 0, 1.5],
      look_at: [0, 0, 1.5],
      focus: 5,
      screen: [6.4, 4.8]
    },
    ambient: [0.2, 0.2, 0.2],
    items: [
      {type: "sphere", origin: [0, 0, 1], radius: 1, color: "red"},
      {type: "plain", origin: [0, 0, 0], dx: [1, 0, 0], dy: [0, 1, 0],
       colorx: "blue", colory: "white"}
    ],
    illuminators: [
      {origin: [1, -2, 2], color: "white"}
    ]
  }

  const scene = build_from_json(JSON.stringify(config))
  const canvas = $("#screen")
  const [width, height] = scene.resolution
  canvas.attr({width, height})

  const screen = Screen(canvas)
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
