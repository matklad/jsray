import {Vector} from "./vector.js"
import {Ray, ray_from_to} from "./ray.js"
import {solve_square_equation} from "./utils.js"

export const Sphere = (center, radius) => {return {
  center: center,
  radius: radius,

  // should return positive alpha such that ray.point_along(alpha) is on shpere
  // or -1, if there is no such point
  intersect: (ray) => {
    const {origin:o, direction:d} = ray
    const a = d.dot(d)
    const b = 2 * d.dot(o.sub(center))
    const c = o.sub(center).dot(o.sub(center))

    let roots = solve_square_equation(a, b, c - radius * radius)
    roots = roots.filter((x) => x >= 0)
    const t = Math.min(...roots)
    if (t < Infinity) {
      return t
    }
    else {
      return -1
    }
  },

  normal_at: (point) => {
    const n = point.sub(center)
    return n.scale(1 / n.length())
  }
}}

const test_normal_at = () => {
  const s = Sphere(Vector(0, 0, 0), 1)
  console.log(s.normal_at(Vector(1, 0, 0)))
}
test_normal_at()

const test = () => {
  const origin = Vector(0, 0, 0)
  const radius = 1
  const s = Sphere(origin, radius)
  const p = Vector(10, 0, 0)
  const r = ray_from_to(p, origin)
  console.log(s.intersect(r))
}
test()
