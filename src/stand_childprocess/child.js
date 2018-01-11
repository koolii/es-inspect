const log = (name, param, ms = 1000) => (
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Name: ${name}, Param: ${JSON.stringify(param, null, '\t')}`)
      resolve(param)
    }, ms)
  })
)

process.on('message', async (msg) => {
  const b = await log(msg.name, msg.param)
  process.send({ status: 'success', content: b })
})
