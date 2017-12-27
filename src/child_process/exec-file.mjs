import childProcess from 'child_process'

console.log(`parent: ${process.pid}`)

const execFile = () => {
  const child = childProcess.execFile('ls', ['-l'], (err, stdiout, stderr) => {
    if (err) {
      console.error('stderr', stderr)
    }

    console.log(stdiout)
    console.log(`pid: ${child.pid}`)
  })

  return child
}

export default execFile
