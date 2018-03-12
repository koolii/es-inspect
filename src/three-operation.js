const asyncF = async () => {
  return await Promise.resolve(100)
}

// 三項演算子でasync/awaitを行っていても正常に動作する
(async () => {
  const a = false
  const xa = a ? true : await asyncF()
  console.log(xa)

  const b = true
  const xb = b ? true : await asyncF()
  console.log(xb)
})()
