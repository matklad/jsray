import {direction_from_to, Vector} from './vector.js'

export const Ray = (origin, direction) => {return {
  origin: origin,
  direction: direction,

  point_along: (t) =>
    origin.add(direction.scale(t))
}}

export const ray_from_to = (start, finish) =>
  Ray(start, direction_from_to(start, finish))
