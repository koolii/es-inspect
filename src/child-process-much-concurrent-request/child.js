process.on('message', (req) => {
  const { id, msg } = req
  const ms = id % 2 === 0 ? id * 100 : id * 400

  setTimeout(() => {
    console.log(`[CHILD] received message(id=${id}) ${msg}`)
    req.diff = id * 100
    process.send(req)
  }, ms)
})
