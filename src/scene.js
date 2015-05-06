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

    const _reflect_ray = (ray, intersect, normal) => {
      const dir = ray.direction
      const reflected_dir = dir.sub(normal.scale(2 * dir.dot(normal)))
      return Ray(intersect.add(reflected_dir.scale(1e-4)), reflected_dir)
    }

    const _run_ray = (ray) => {
      const {t, item} = _find_intersection(ray)
      if (item) {
        const intersect = ray.point_along(t)
        const normal = item.normal_at(intersect)
        const color = _item_lighted_at(item, intersect, ray.direction.scale(-1))
        const reflected = _reflect_ray(ray, intersect, normal)
        return {color, reflected}
      } else {
        return {color: null, reflected: null}
      }
    }

  return {
    resolution: resolution,

    color_at: (x, y) => {
      const [res_x, res_y] = resolution
      const dx = (2 * x - res_x) / res_x
      const dy = (2 * y - res_y) / res_y

      const ray = camera.cast_ray(dx, dy)
      const {color, reflected} = _run_ray(ray)
      if (color) {
        const {color: mirrored_color, _} = _run_ray(reflected)
        if (mirrored_color) {
          return color.mix_with(mirrored_color.set_bright(0.3))
        }
        return color
      }

      return background_color
    }

  }
}
