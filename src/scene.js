import {colors} from './color.js'

export const Scene = ({camera,
                       resolution,
                       items,
                       background_color=colors.black}) => {
    const _find_intersection = (ray) => {
      let min_t = -1
      let min_item = null
      const f = (acc, item) => {
        const t = item.intersect(ray)
        if (t != -1 && (acc.t == -1 || t < acc.t)) {
          return {t, item}
        }
        return acc
      }

      return items.reduce(f, {t: -1, item:null}).item
    }

  return {
    resolution: resolution,

    color_at: (x, y) => {
      const [res_x, res_y] = resolution
      const dx = (2 * x - res_x) / res_x
      const dy = (2 * y - res_y) / res_y

      const ray = camera.cast_ray(dx, dy)
      const item = _find_intersection(ray)
      return item ? item.color_at(null) : background_color
    }

  }

  return self
}
