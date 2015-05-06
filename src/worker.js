import {build_from_json} from './scene_builder.js'

onmessage = (e) => {
  const {json, x_range, y_range} = e.data
  const scene =  build_from_json(json).result
  const start_time = performance.now();
  for (let x = x_range[0]; x < x_range[1]; x++) {
    for (let y = y_range[0]; y < y_range[1]; y++) {
      const c = scene.color_at(x, y)
      postMessage([[x, y], [c.r, c.g, c.b]])
    }
  }
  postMessage("Done!")
  close()
}
