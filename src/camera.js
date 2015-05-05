import {direction_from_to, Vector} from './vector.js'
import {ray_from_to} from './ray.js'

export const Camera = (
  {origin,
   look_at=Vector(0, 0, 0),
   up: pre_up,
   focus,
   screen,
   resolution}
) => {
  const [screen_width, screen_height] = screen
  const [res_x, res_y] = resolution
  const direction = direction_from_to(origin, look_at)
  const right = direction.cross(pre_up).direction()
  const up = right.cross(direction).direction()
  const center = origin.add(direction.scale(focus))

  return {
    resolution: resolution,

    cast_ray: (px, py) => {
      const dx = (px - res_x / 2) * (screen_width / res_x)
      const dy = (py - res_y / 2) * (screen_height / res_y)
      const point_on_screen = center
              .add(right.scale(dx))
              .add(up.scale(dy))

      return ray_from_to(origin, point_on_screen)
    }
  }
}
