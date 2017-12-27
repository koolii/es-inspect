import execFile from './exec-file'
import exec from './exec'
import spawn from './spawn'
import fork from './fork'

// https://medium.freecodecamp.org/node-js-child-processes-everything-you-need-to-know-e69498fe970a

const tasks = [execFile, exec, fork, spawn].reverse()

setInterval(() => {
  if (tasks.length <= 0) {
    console.log('fin.')

    process.exit(-1)
    return -1
  }

  const task = tasks.pop()
  task()

  return 0
}, 5000)
