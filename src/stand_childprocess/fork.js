const path = require('path')
const childProcess = require('child_process')

const createChild = (events) => {
  return new Promise((resolve, reject) => {
    const child = childProcess.fork('./child', [], {
      cwd: path.resolve(__dirname)
    })

    if (!child.connected) {
      reject(new Error('Not Connected to child process'))
    }

    // const eventKeys = Object.keys(events)
    //
    // eventKeys.forEach(key => {
    //   child.on(key, events[key])
    // })

    child.on('disconnect', () => {
      process.kill(child.pid)
    })

    resolve(child)
  })
}

module.exports = async () => {
  try {
    const cp = await createChild()
    console.log('created child process')

    const _ = {
      process: cp,
      setEvents: (events) => {
        const keys = Object.keys(events)
        keys.forEach(key => {
          _.process.on(key, events[key])
        })
      },
      disconnect: () => {
        _.process.disconnect()
      },
      send: async (msg) => {
        console.log(`fork-send: ${JSON.stringify(msg)}`)

        return new Promise(resolve => {
          _.process.send(msg)
          _.process.on('message', (res) => {
            if (res.status === 'error') {
              reject(new Error('error'))
            }

            console.log(`fork-message: ${JSON.stringify(res)}`)

            resolve(res)
          })
        })
      }
    }

    return _
  } catch (err) {
    throw err
  }
}
