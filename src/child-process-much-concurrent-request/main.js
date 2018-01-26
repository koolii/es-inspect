const Fork = require('./fork')

const main = async () => {
  const child = new Fork('./child')
  await child.create()

  const sendMessage = async (id) => {
    const result = await child.send(id, `[id: ${id}] dummy message`)
    console.log(`=> RESULT IS ${JSON.stringify(result)}`)
  }

  const promise = []
  for (let i = 0; i < 10; i += 1) {
    promise.push(sendMessage(i))
  }

  await Promise.all(promise)
  child.disconnect()
}

main()
