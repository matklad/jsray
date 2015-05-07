export const Color = (r, g, b) => {
  const f = (alpha) =>
          Math.min(Math.round((alpha * 255)), 255)

  return {
    r: r,
    g: g,
    b: b,

    as_uint8: () => [f(r), f(g), f(b)],

    as_rgba_str: () => {
      return "rgba(" + f(r) + "," + f(g) + "," + f(b) + "," + 255 +")"
    },

    under_light: (light) => {
      return Color(r * light.r, g * light.g, b * light.b)
    },

    mix_with: (other) => Color(r + other.r, g + other.g, b + other.b),

    set_bright: (bright) => Color(r * bright, g * bright, b * bright)
  }}


export const colors = {
  white: Color(0.9, 0.9, 0.9),
  black: Color(0.1, 0.1, 0.1),

  red: Color(0.9, 0.1, 0.1),
  green: Color(0.1, 0.9, 0.1),
  blue: Color(0.1, 0.1, 0.9)
}
