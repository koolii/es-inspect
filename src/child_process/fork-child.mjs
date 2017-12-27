console.log('child start at fork')

process.on('message', (msg) => {
  console.log(msg)

  setTimeout(() => {
    process.send({ message: 'from child' })
  }, 1000)
})

process.on('exit', () => {
  console.log('child exit')
})
