/* eslint-disable no-await-in-loop */
const Fork = require('./fork')

const main = async () => {
  // const c = await fork()
  const c = new Fork()
  await c.init()

  // 一旦セットされているということで処理
  // const event = {
  //   'message': (response) => {
  //     // if (c.connected) {
  //     //   child.disconnect()
  //     // }
  //     if (response.status === 'error') {
  //       reject(response)
  //     }
  //
  //     resolve(response)
  //   }
  // }
  // c.setEvents(event)

  for (let i = 0; i < 10; i += 1) {
    console.log(`Loop: ${i}`)
    const result = await c.send({ name: 'kuri', param: { age: 25, height: 159 } })

    console.log(`fin: ${JSON.stringify(result)}`)
  }

  c.disconnect()
}

main()
