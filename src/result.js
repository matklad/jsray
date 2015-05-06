export const Result = {
  Ok: (result) => ({ok: true, result}),
  Fail: (message) => ({ok: false, message})
}
