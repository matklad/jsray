export const Result = {
  Ok: (result) => {return {
    ok: true,
    result: result,
    then: (f) => {
      const res = f(result)
      if ('ok' in res) {
        return res
      } else {
        return Result.Ok(res)
      }
    }
  }},

  Fail: (message) => {
    self = {
      ok: false,
      message: message,
      then: (f) => self
    }
    return self
  },

  all: (results) => {
    if (results.length === 0) {
      return Result.Ok([])
    }
    const x = results[0]
    const xs = results.slice(1, results.length)
    return x.then((xr) =>
                  Result.all(xs).then(xrs => {
                    xrs.unshift(xr)
                    return xrs
                  }))
  }
}
