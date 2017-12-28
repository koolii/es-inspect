const doChildProcess = require('./fork')

const resultList = []

for (let i = 0; i < 100; i += 1) {
  doChildProcess('./fork-child', { data: i }, (result) => {
    console.log(result)
    resultList.push(result)
  })
}


console.log(resultList)
