export const solve_square_equation = (a, b, c) => {
  if (a == 0.0) {
    if (b == 0.0) {
      return [] // wrong if c == 0
    }
    else {
      return [-c / b]
    }
  }
  else {
    const d = b * b - 4 * a * c
    if (d < 0) {
      return []
    }
    return [(-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)]
  }
}