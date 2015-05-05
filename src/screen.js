export const Screen = (canvas, resolution) => {
  const ctx = canvas.getContext("2d")
  const [width, height] = resolution
  ctx.fillRect(0, 0, width, height)

  return {
    canvas: canvas,
    ctx: ctx,
    resolution: resolution,
    put_pixel: (x, y, color) => {
      const [r, g, b] = color
      ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + 1 +")"
      ctx.fillRect(x, y, 1, 1)
    },
    update: () => {
      console.log("screen update now")
    }
  }
}