import {Vector} from './vector.js'

export const Ray = (origin, direction) => {return {
  origin: origin,
  direction: direction,

  point_along: (t) =>
    origin.add(direction.scale(t))
}}
