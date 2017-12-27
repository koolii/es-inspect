import childProcess from 'child_process'

console.log(`parent: ${process.pid}`)

const execFile = () => {
  const child = childProcess.execFile('ls', ['-l'], (err, stdout) => {
    if (err) {
      console.log(err.stack)
    }
    console.log(stdout)
    console.log(`pid: ${child.pid}`)
  })

  return child
}

export default execFile
