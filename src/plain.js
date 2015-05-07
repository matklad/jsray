export const Plain = (origin, dx, dy, color_a, color_b, material) => {
  // Plain is origin + alpha dx + beta dy
  const normal = dx.cross(dy).direction()

  return {
    material: material,

    intersect: (ray) => {
      const {origin: ro, direction: rd} = ray
      const p = rd.dot(normal)
      if (Math.abs(p) < 1e-5) {
        return -1
      }
      const t = (origin.sub(ro)).dot(normal) / rd.dot(normal)
      if (t < 0) {
        return -1
      }
      return t
    },

    normal_at: (point) => normal,

    color_at: (point) => {

      const p = point.sub(origin)
      const dx_ort = normal.cross(dx)
      const dy_ort = normal.cross(dy)
      const alpha = p.dot(dy_ort) / dx.dot(dy_ort)
      const beta =  p.dot(dx_ort) / dy.dot(dx_ort)
      const odd = (x) => ((x % 2) + 2) % 2 < 1 ? 0 : 1
      return [color_a, color_b][odd(alpha) ^ odd(beta)]
    }
  }
}
