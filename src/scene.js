import {colors} from './color.js'
import {Ray} from './ray.js'

export const Scene = ({camera,
                       resolution,
                       items,
                       ambient,
                       illuminators,
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

      return items.reduce(f, {t: -1, item:null})
    }

    const _item_lighted_at = (item, pos, viewer_dir) => {
      const f = (color, illuminator) => {
        const light_dir = (illuminator.origin.sub(pos)).direction()
        if (!_find_intersection(Ray(pos.add(light_dir.scale(1e-4)), light_dir)).item) {
          const normal = item.normal_at(pos)
          const diffuse_bright = normal.dot(light_dir)
          const diffuse_light = illuminator.color.set_bright(diffuse_bright)

          const reflected_dir = normal.scale(2 * light_dir.dot(normal)).sub(light_dir)
          const reflected_bright = Math.pow(reflected_dir.dot(viewer_dir), 2)
          const reflected_light = illuminator.color.set_bright(reflected_bright)

          const item_color = item.color_at(pos)
          const with_diffuse = color.mix_with(item_color.under_light(diffuse_light))
          return with_diffuse.mix_with(item_color.under_light(reflected_light))
        }
        return color
      }
      const init_color = item.color_at(pos).under_light(ambient)
      return illuminators.reduce(f, init_color)
    }

  return {
    resolution: resolution,

    color_at: (x, y) => {
      const [res_x, res_y] = resolution
      const dx = (2 * x - res_x) / res_x
      const dy = (2 * y - res_y) / res_y

      const ray = camera.cast_ray(dx, dy)
      const {t, item} = _find_intersection(ray)
      return item ? _item_lighted_at(item, ray.point_along(t), ray.direction.scale(-1)) : background_color
    }

  }
}
