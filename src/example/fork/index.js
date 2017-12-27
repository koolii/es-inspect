const getChildProcess = require('./fork')

for (let i = 0; i < 100; i += 1) {
  const child = getChildProcess((result) => {
    console.log(result)
  })

  child.send({ data: i })
}
