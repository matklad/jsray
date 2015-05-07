export const Triangle = (a, b, c, color, material) => {
  const ab = b.sub(a)
  const bc = c.sub(b)
  const ca = a.sub(c)

  const normal = c.sub(a).cross(b.sub(a)).direction()

  return {
    a: a,
    b: b,
    c: c,
    material: material,

    intersect: (ray) => {
      const {origin: ro, direction: rd} = ray
      const t = (a.sub(ro)).dot(normal) / rd.dot(normal)
      if (t < 0) {
        return -1
      }
      const pint = ray.point_along(t)
      const eps = 1e-4
      if (pint.sub(a).cross(ab).dot(normal) >= eps &&
          pint.sub(b).cross(bc).dot(normal) >= eps &&
          pint.sub(c).cross(ca).dot(normal) >= eps) {
        return t
      }
      return -1
    },

    normal_at: (point) => normal,

    color_at: (point) => color
  }
}