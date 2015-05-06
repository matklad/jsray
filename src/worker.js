import {build_from_json} from './scene_builder.js'

onmessage = (e) => {
  const scene =  build_from_json(e.data).result
  const start_time = performance.now();
  console.log("Start rendering...")
  for (let x = 0; x < scene.resolution[0]; x++) {
    for (let y = 0; y < scene.resolution[1]; y++) {
      const c = scene.color_at(x, y)
      postMessage([[x, y], [c.r, c.g, c.b]])
    }
  }
  console.log("...done!")
  const end_time = performance.now();

  console.log(e.data)
  postMessage(e.data + e.data)
}
