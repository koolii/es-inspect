const fork = require('./fork')

const main = async () => {
  const c = await fork()

  // 一旦セットされているということで処理
  // const event = {
  //   'message': (response) => {
  //     // if (c.connected) {
  //     //   child.disconnect();
  //     // }
  //     if (response.status === 'error') {
  //       reject(response);
  //     }
  //
  //     resolve(response)
  //   }
  // }
  // c.setEvents(event)

  for (let i = 0; i < 1; i += 1) {
    console.log(`Loop: ${i}`)
    const result = await c.send({ name: 'kuri', param: { age: 25, height: 159 }})

    console.log(`fin: ${JSON.stringify(result)}`)
  }
  // console.log(c)
  // console.log(JSON.stringify(c))

}

main()
