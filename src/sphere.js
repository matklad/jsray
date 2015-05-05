export const Sphere = (center, radius) => {return {
  center: center,
  radius: radius,

  // should return positive alpha such that ray.point_along(alpha) is on shpere
  // or -1, if there is no such point
  intersect: (ray) => 92,

  normal_at: (point) => Vector(92, 92, 92)
}}
