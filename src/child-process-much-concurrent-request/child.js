process.on('message', (req) => {
  setTimeout(() => {
    console.log(`[child]it's about to send a reply ${req}`)
    process.send(req)
  }, 10000)
})
