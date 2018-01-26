const path = require('path')
const childProcess = require('child_process')

const forkC = (childPath, arg) => (
  new Promise((resolve, reject) => {
    try {
      const child = childProcess.fork(childPath, arg, {
        cwd: path.resolve(__dirname),
      })

      if (!child.connected) {
        reject(new Error('failed to create child process'))
      }

      child.on('message', (result) => {
        console.log(`[parent]message: ${result}`)
      })
      child.on('disconnect', () => {
        console.log('[parent]disconnect')
        process.kill(child.pid)
      })
      child.on('unhandledRejection', (err) => {
        console.log(`[parent]unhandledRejection: ${err}`)
      })

      resolve(child)
    } catch (err) {
      reject(err.message || err)
    }
  })
)

const send = (child, req) => (
  new Promise((resolve) => {
    child.once('message', (result) => {
      console.log(`[parent-reply]message: ${result}`)
      resolve(result)
    })
    child.send(req)
  })
)

module.exports = { forkC, send }
