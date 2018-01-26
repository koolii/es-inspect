const Fork = require('./fork')

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))
const path = './child'
const main = async () => {
  const child = new Fork(path)
  await child.create()

  const sendMessage = async (id) => {
    const result = await child.send(id, `[id: ${id}] dummy message`)
    console.log(`=> RESULT IS ${JSON.stringify(result)}`)
  }

  const promise = []
  for (let i = 0; i < 10; i += 1) {
    // const result = await child.send({ id: i, msg: `[id: ${i}] dummy message` })
    // console.log(`RESULT IS ${JSON.stringify(result)}`)
    // await sleep()
    promise.push(sendMessage(i))
  }

  await Promise.all(promise)
  process.kill(process.pid)
}

main()
