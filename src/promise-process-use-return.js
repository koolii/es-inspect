// Promise内部でreturnを記述していなくてもresolve/rejectさえ記述すれば、後の処理はスルーされると思っていたが、
// 実際には処理は最後まで続き、しかもなぜかreject()自体は呼ばれずresolve()は期待どおりの値になっている
// コメントアウトしているがreturnを追加するとそこまででPromiseの処理は終了した
// なので、returnを付けない際はresolve()に渡された値がpromiseの最終的な返り値になるが、処理自体は最後まで続く(reject()が挟まっていたとしてもreoslve()が優先される)
// throwした時の挙動も確認したい
let callCount
const l = console.log.bind(console)
const isBigger = (stepNum, num) => {
  if (stepNum < num) {
    l(` * number(${num}) is bigger than stepNum(${stepNum}).`)
    return true
  }
  l(` * number(${num}) is less than stepNum(${stepNum}) or equal. => end.`)
  return false
}

const promiseWithoutReturn = (step) => {
  l(`■ COUNT(promiseWithoutReturn) => ${callCount}`)
  callCount += 1
  return new Promise((resolve, reject) => {
    for (let i = 1; i <= 5; i += 1) {
      if (!isBigger(i, step)) { resolve(i) }
    }
    reject('over 6.')
  })
}
const promiseWithReturn = (step) => {
  l(`■ COUNT(promiseWithReturn) => ${callCount}`)
  callCount += 1
  return new Promise((resolve, reject) => {
    for (let i = 1; i <= 5; i += 1) {
      if (!isBigger(i, step)) { resolve(i); return; }
    }
    reject('over 6.')
  })
}

(async () => {
  callCount = 1
  try {
    l(` * result => ${await promiseWithoutReturn(1)}`)
    l(` * result => ${await promiseWithoutReturn(2)}`)
    l(` * result => ${await promiseWithoutReturn(3)}`)
    l(` * result => ${await promiseWithoutReturn(4)}`)
    l(` * result => ${await promiseWithoutReturn(5)}`)
    l(` * result => ${await promiseWithoutReturn(6)}`)
  } catch (e) {
    l(e)
  }
  l('==============================================')
  callCount = 1
  try {
    l(` * result => ${await promiseWithReturn(1)}`)
    l(` * result => ${await promiseWithReturn(2)}`)
    l(` * result => ${await promiseWithReturn(3)}`)
    l(` * result => ${await promiseWithReturn(4)}`)
    l(` * result => ${await promiseWithReturn(5)}`)
    l(` * result => ${await promiseWithReturn(6)}`)
  } catch (e) {
    l(e)
  }
})()
