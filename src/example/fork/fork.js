// import childProcess from 'child_process'
const path = require('path')
const childProcess = require('child_process')

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

// callbackの代わりにeventEmitterを渡して、処理をやるのもありな気がする
const doChildProcess = (childPath = './fork-child', callback) => {
  // 0 creaste child process
  const child = childProcess.fork(childPath, [], {
    cwd: path.resolve(__dirname),
    // stdio: 'inherit',
    // silent: false,
  })
  // console.log(Object.keys(child))

  if (!child.connected) {
    // errorHandler({ error: true, message: 'Not Connected to child process' })
    callback({ error: true, message: 'Not Connected to child process' })
  }

  // 2
  child.on('message', (result) => {
    if (child.connected) {
      child.disconnect()
    }

    console.log('complete!!')
    callback(result)

    // if (result.error) {
    //   errorHandler(child, result)
    // }
    // successHandler(child, result)
  })

  // 3
  child.on('disconnect', () => {
    // // ここに来た時点で、child.connected === falseになる
    // console.log('disconnected')
    // 実行しても child.killedはtrueにはならないが、一応killを差し込む
    process.kill(child.pid)
  })

  return child
}

module.exports = doChildProcess

// Error[ERR_IPC_DISCONNECTED]: IPC channel is already disconnected
// at ChildProcess.target.disconnect(internal / child_process.js: 728: 26)
// at ChildProcess.child.on
// at emitTwo(events.js: 126: 13)
// at ChildProcess.emit(events.js: 214: 7)
// at emit(internal / child_process.js: 772: 12)
// at _combinedTickCallback(internal / process / next_tick.js: 141: 11)
// at process._tickCallback(internal / process / next_tick.js: 180: 9)
