export const Screen = (canvas_selection, resolution) => {
  const canvas = canvas_selection[0]
  const ctx = canvas.getContext("2d")
  const [width, height] = resolution
  ctx.fillRect(0, 0, width, height)

  return {
    canvas: canvas,
    ctx: ctx,
    resolution: resolution,
    put_pixel: (x, y, color) => {
      ctx.fillStyle = color.as_rgba_str()
      ctx.fillRect(x, y, 1, 1)
    },
    update: () => {
      console.log("screen update now")
    }
  }
}
