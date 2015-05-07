import {Color} from './color.js'
import {Vector} from './vector.js'
import {Screen} from './screen.js'
import {build_from_json} from './scene_builder.js'

const default_config =  {
  resolution: [64 * 10,
               48 * 10],
  camera: {
    origin: [10, 0, 1.5],
    look_at: [0, 0, 1.5],
    focus: 5,
    screen: [6.4, 4.8]
  },
  ambient: [0.2, 0.2, 0.2],
  items: [
    {type: "sphere", origin: [0, 0, 1], radius: 1, color: "red", material: "plastic"},
    {type: "sphere", origin: [0, 2, 1], radius: 1, color: "red", material: "metal"},
    {type: "plain", origin: [0, 0, 0], dx: [1, 0, 0], dy: [0, 1, 0],
     colorx: "blue", colory: "white", material: "plastic"}
  ],
  illuminators: [
    {origin: [1, 1, 3], color: "white"}
  ]
}

const ui = {
  canvas: null,
  start_button: null,
  description: null
}

const init_ui = () => {
  window.ui = ui
  ui.canvas = $("#screen")
  ui.start_button = $('.start-button')
  ui.description = $('.scene-description')
  ui.description.val(JSON.stringify(default_config, null, 4))
  ui.start_button.on('click', on_start_button)
}

const on_start_button = () => {
  const text = ui.description.val()
  let json = null
  try {
    json = JSON.parse(text)
  } catch (SyntaxErorr) {
    alert("Malformed config")
    return
  }
  const {ok, result: scene, message} = build_from_json(json)
  if (!ok) {
    alert(message)
  } else {
    const [width, height] = scene.resolution
    ui.canvas.width(width)
    ui.canvas.height(height)
    ui.canvas.attr({width, height})
    const screen = Screen(ui.canvas)
    render_scene(json, screen)
  }
}

$(() => {
  init_ui()
  // on_start_button()
})

const render_scene = (json, screen) => {
  let n_done = 0
  const on_message = (e) => {
    if (e.data === "Done!") {
      n_done++
      if (n_done === n_workers) {
        const end_time = performance.now();
        console.log("...done!")
        const seconds = ((end_time - start_time) / 1000).toFixed(2)
        console.log(seconds, 'seconds')
        $('.spf').text(seconds)
      }

      return
    }
    e.data.forEach(([[x, y], [r, g, b]]) =>
                   screen.put_pixel(x, y, Color(r, g, b)))
  }

  const n_workers = 4
  const [width, height] = screen.resolution
  const block = Math.floor(width / n_workers)

  console.log("Start rendering...")
  const start_time = performance.now();
  for (let i = 0; i < n_workers; i++) {
    const lo = i * block
    const hi = i === n_workers - 1 ? width : (i + 1) * block
    const x_range = [lo, hi]
    const y_range = [0, height]
    const w = new Worker('js/worker.js')
    w.onmessage = on_message
    w.postMessage({json, x_range, y_range})
  }
}
