const path = require('path')
const childProcess = require('child_process')

const doChildProcess = (childPath, sendData) => (
  new Promise((resolve, reject) => {
    try {
      const child = childProcess.fork(childPath, [], {
        cwd: path.resolve(__dirname),
        // stdio: 'inherit',
        // silent: false,
      })

      if (!child.connected) {
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

      process.on('unhandledRejection', () => {
        console.log(`unhandledRejection: ${JSON.stringify(sendData)}`)
      })
      process.on('uncaughtException', () => {
        console.log(`uncaughtException: ${JSON.stringify(sendData)}`)
      })

      // 1
      child.send(sendData)
    } catch (err) {
      reject(new Error(`too much requests: ${sendData}`))
    }
  })
)

module.exports = doChildProcess
