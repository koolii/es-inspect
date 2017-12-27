import execFile from './exec-file'
import exec from './exec'

const tasks = [execFile, exec]

setInterval(() => {
  if (tasks.length <= 0) {
    console.log('fin.')

    process.exit(-1)
    return -1
  }

  const task = tasks.pop()
  task()

  return 0
}, 1000)
