import {colors} from './color.js'

export const Scene = ({camera,
                       resolution,
                       objects}) => {
  return {
    resolution: resolution,

    color_at: (x, y) => {
      const [res_x, res_y] = resolution
      const dx = (2 * x - res_x) / res_x
      const dy = (2 * y - res_y) / res_y

      const r = camera.cast_ray(dx, dy)
      const o = objects[0]
      if (o.intersect(r) == -1) {
        return colors.black
      } else {
        return colors.blue
      }
    }
  }
}
