import {Color} from './color.js'
import {Vector} from './vector.js'
import {Screen} from './screen.js'
import {build_from_json} from './scene_builder.js'

const default_config =  {
  resolution: [64 * 1,
               48 * 1],
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

const render_scene = (scene, screen) => {
  const w = new Worker('js/worker.js')
  w.onmessage = ({data: [[x, y], [r, g, b]]}) => {
    screen.put_pixel(x, y, Color(r, g, b))
  }
  w.postMessage(scene)
}
