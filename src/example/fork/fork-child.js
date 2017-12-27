process.on('message', (packet) => {
  // console.log(`[child] arrives message: ${JSON.stringify(packet, null, '\t')}`)

  try {
    if (packet.data % 7 === 0) {
      // can't catch Promise.reject()
      // Promise.reject('promise-reject')

      // can catch Error
      throw new Error(packet.data)
    } else if (packet.data % 3 === 0) {
      process.send({ error: false, ng: true, data: packet.data * 100 })
    }

    // fork-child's process === fork's child
    process.send({ error: false, ng: false, data: packet.data * 10 })
  } catch (err) {
    throw err
  }
})

process.on('uncaughtException', (err) => {
  // console.log(`[child] uncaught error: ${err}`)
  process.send({ error: true, ng: null, message: err.message })
})
