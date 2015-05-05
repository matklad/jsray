export const Vector = (x, y, z) => {
  const self = {
    x: x,
    y: y,
    z: z,

    add: (rhs) =>
      Vector(x + rhs.x, y + rhs.y, z + rhs.z),

    sub: (rhs) =>
      Vector(x - rhs.x, y - rhs.y, z - rhs.z),

    dot: (rhs) =>
      x*rhs.x + y*rhs.y + z*rhs.z,

    cross: (rhs) => {
      const {x: a, y: b, z: c} = rhs
      // x y z
      // a b c
      return Vector(y*c - z*b, z*z - x*c, x*b - y*a)
    },

    length: () => Math.sqrt(x*x + y*y + z*z),

    direction: () => {
      const l = self.length()
      return Vector(x / l, y / l, z / l)
    },

    scale: (alpha) =>
      Vector(x * alpha, y * alpha, z * alpha)
  }

  return self
}

export const direction_from_to = (start, finish) =>
  finish.sub(start).direction()
