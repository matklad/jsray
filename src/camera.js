import {direction_from_to, Vector} from './vector.js'
import {ray_from_to} from './ray.js'

export const Camera = (
  {origin,
   look_at=Vector(0, 0, 0),
   up: pre_up=Vector(0, 0, 1),
   focus,
   screen}
) => {
  const [screen_width, screen_height] = screen
  const direction = direction_from_to(origin, look_at)
  const right = direction.cross(pre_up).direction()
  const up = right.cross(direction).direction()
  const center = origin.add(direction.scale(focus))

  return {
    // x, y from -1 to 1
    cast_ray: (x, y) => {
      const dx = x * screen_width
      const dy = y * screen_height
      const point_on_screen = center
              .add(right.scale(dx))
              .add(up.scale(dy))

      return ray_from_to(origin, point_on_screen)
    }
  }
}
