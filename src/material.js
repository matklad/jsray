const Material = (shine, mirroring) => {
  return {
    alpha: Math.round(Math.pow(10, (1 - shine) * 5)),
    mirroring: mirroring
  }
}

export const materials = {
  metal: Material(0.8, 0.2),
  plastic: Material(0.01, 0.01),
  mirror: Material(0.7, 0.9)
}