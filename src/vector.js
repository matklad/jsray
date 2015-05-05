export const Vector = (x, y, z) => ({
  x: x,
  y: y,
  z: z,
  add: (rhs) => Vector(x + rhs.x, y + rhs.y, z + rhs.z)
})
