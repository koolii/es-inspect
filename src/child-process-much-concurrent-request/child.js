process.on('message', ({ idx, msg }) => {
  const ms = idx % 2 === 0 ? idx * 100 : idx * 400
  setTimeout(() => {
    console.log(`[child]it's about to send a reply ${msg}`)
    process.send(idx)
  }, ms)
})
