const { forkC, send, disconnect } = require('./fork')

const main = async () => {
  const child = await forkC('./src/child-process-much-concurrent-request/child')
  const req = (idx, msg) => send(child, { idx, msg })

  let i = 0
  const intervalId = setInterval(() => {
    req(i, `[num: ${i}]origin test message`)

    // kill parent/child process
    if (i === 10) {
      clearInterval(intervalId)
      setTimeout(() => {
        disconnect(child)
        process.kill(process.pid)
      }, 5000)
    }

    i += 1
  }, 100)
}

main()
