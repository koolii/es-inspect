const doChildProcess = require('./fork')

for (let i = 0; i < 100; i += 1) {
  const child = doChildProcess('./fork-child', (result) => {
    console.log(result)
  })

  child.send({ data: i })
}
