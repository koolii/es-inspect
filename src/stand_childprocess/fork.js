const path = require('path')
const childProcess = require('child_process')

class Fork {
  // ignore event whose name is message
  constructor(module = 'child', events) {
    this.module = module
    this.events = events
    this.p = null
  }

  async init() {
    this.p = await this._createChildProcess()

    if (this.events) {
      // set callbacks have already been defined in constructor
      Object.keys(this.events).forEach((key) => {
        this.p.on(key, this.events[key])
      })
    }
  }

  disconnect() {
    if (this.p) {
      this.p.disconnect()
    }
  }

  async send(msg) {
    return new Promise((resolve, reject) => {
      this.p.once('message', (res) => {
        if (res.status === 'error') {
          reject(new Error('error'))
        }
        resolve(res)
      })
      this.p.send(msg)
    })
  }

  _createChildProcess() {
    return new Promise((resolve, reject) => {
      try {
        const child = childProcess.fork(`./${this.module}`, [], {
          cwd: path.resolve(__dirname),
        })

        if (!child.connected) {
          reject(new Error('Not Connected to child process'))
        }

        child.on('disconnect', () => {
          process.kill(child.pid)
        })

        // if this call returns anything, it doesn't occur anything
        child.on('message', (res) => {
          // you can understand that setted child-callback executes consecutively
          console.log(`logger: ${res}, ${JSON.stringify(res)}`)
        })

        resolve(child)
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = Fork
