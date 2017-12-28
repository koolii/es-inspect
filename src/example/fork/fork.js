const path = require('path')
const childProcess = require('child_process')

const doChildProcess = (childPath, sendData) => (
  new Promise((resolve, reject) => {
    const child = childProcess.fork(childPath, [], {
      cwd: path.resolve(__dirname),
      // stdio: 'inherit',
      // silent: false,
    })
    // console.log(Object.keys(child))

    if (!child.connected) {
      // errorHandler({ error: true, message: 'Not Connected to child process' })
      reject(new Error('Not Connected to child process'))
    }

    // 2
    child.on('message', (result) => {
      if (child.connected) {
        child.disconnect()
      }

      resolve(result)
    })

    // 3
    child.on('disconnect', () => {
      process.kill(child.pid)
    })

    // 1
    child.send(sendData)
  })
)

module.exports = doChildProcess
