const doChildProcess = require('./fork')

const childs = []

for (let i = 0 i < 200 i += 1) {
  childs.push(doChildProcess('./fork-child', { data: i }))
}

Promise.all(childs)
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log(`error: ${err}`)
  })
