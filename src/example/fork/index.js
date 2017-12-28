const doChildProcess = require('./fork')

const childs = []

for (let i = 0; i < 100; i += 1) {
  childs.push(doChildProcess('./fork-child', { data: i }))
}

Promise.all(childs)
  .then((results) => {
    console.log(results)
  })


// const errorHandler = (child, result) => {
//   child.result = true
//   child.response = result
//   console.log(`* OCCURED CHILD PROCESS: ${JSON.stringify(result, null, '\t')}`)
// }
// const successHandler = (child, result) => {
//   child.result = false
//   child.response = result
//   console.log(`* SUCCEEDED CHILD PROCESS: ${JSON.stringify(result, null, '\t')}`)
// }
