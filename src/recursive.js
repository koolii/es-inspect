class Recursive {
  constructor() {}

  is3partition(num) {
    if (num <= 2) {
      return false
    }
    if (num % 3 === 0) {
      return true
    } else {
      console.log(`now is ${num}`)
      return this.is3partition(num - 1)
    }
  }

  is3withPromise(num) {
    return new Promise((resolve) => {
      if (num <= 2) {
        resolve(false)
      }
      if (num % 3 === 0) {
        resolve(true)
      } else {
        console.log(`now is ${num}`)
        resolve(this.is3partition(num - 1))
      }
    })
  }
}

(async () => {
  const i = new Recursive()
  console.log(i.is3partition(98))
  await i.is3withPromise(101)
})()
