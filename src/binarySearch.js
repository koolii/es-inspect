/**
 * 大量の配列の中から特定の条件のオブジェクトをある程度の精度で抜き出す
 * それぞれのオブジェクトはオブジェクトが生成された時刻を保持しており
 * 引数に渡された時刻以降のオブジェクトを取得するようにする
 */

const init = () => {
  const array = []
  const MAX = 1000000
  for (let i = 0; i < MAX; i += 1) {
    array.push({ id: i + Date.now(), idx: i })
  }
  // const array = [10, 10, 10, 10, 11, 11, 11, 12, 13, 16, 19, 21, 24, 25, 30, 35]
  return array
}

const search = (array, target) => {
  let head = 0
  let tail = array.length

  while (head <= tail) {
  // console.log(`head: ${head}, tail: ${tail}`)
    const center = Math.floor((head + tail) / 2)
    const val = array[center].id

    if (val === target) {
      return center
    } else if (val < target) {
      head = center + 1
    } else {
      tail = center - 1
    }
  }
  // console.log(`val: ${array[tail]}`)
  return tail === -1 ? 0 : tail
}

(() => {
  const array = init()
  console.log(search(array, Date.now() + 30))
})()

