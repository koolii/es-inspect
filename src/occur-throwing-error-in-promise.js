const error = async () => {
  console.log('skip eslint-error [arrow-body-style]')
  // ここでPromiseをreturnしないとtry-catchの中から外れてしまい、catchできなくなる
  // setTimeout(() => {
  //   throw new Error('dummy error')
  // }, 1000)

  // rejectしてもPromiseを返却しているからmainの中でcatchすることが出来る
  // return new Promise((resolve, reject) => {
  //   setTimeout(reject, 400)
  // })

  // Promise内部でErrorをthrowしていたとしてもtry-catchでcatchすることが出来る
  return new Promise(() => {
    throw new Error('forced error in Promise')
  })
}

const exec = () =>
  new Promise((resolve) => {
    resolve(error())
  })


const main = async () => {
  try {
    await exec()
  } catch (err) {
    console.log(`catch error: [${(err && err.message) || err}]`)
  }
}

main()
