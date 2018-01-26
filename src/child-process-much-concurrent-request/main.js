const { forkC, send } = require('./fork')

const main = async () => {
  const child = await forkC('./src/child-process-much-concurrent-request/child')
  const req = (txt) => {
    return send(child, txt)
  }

  let i = 0;
  setInterval(() => {
    req(`[num: ${i}]origin test message`)
    i++;
  }, 3000)
}

main()
