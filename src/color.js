export const Color = (r, g, b) => {return {
  r: r,
  g: g,
  b: b,
  as_rgba_str: () => {
    const f = (alpha) => Math.round(alpha * 255)
    return "rgba(" + f(r) + "," + f(g) + "," + f(b) + "," + 255 +")"
  }
}}


export const colors = {
  white: Color(0.9, 0.9, 0.9),
  black: Color(0.1, 0.1, 0.1),

  red: Color(0.9, 0.1, 0.1),
  green: Color(0.1, 0.9, 0.1),
  blue: Color(0.1, 0.1, 0.9)
}
