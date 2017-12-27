import childProcess from 'child_process'
import headline from './log'

// 通信できるデータはプリミティブ値の他、JSONオブジェクトが許されている。プロセスは2つできているけどゾンビ化したりしないしちゃんとwaitpidするみたいだ。とのこと
// https://qiita.com/gfx/items/2632e49165c3660c997c
const child = childProcess.fork('./src/child_process/fork-child')
const fork = () => {
  headline('fork')

  child.on('message', (msg) => {
    console.log(`on message: ${JSON.stringify(msg)}`)

    setTimeout(() => {
      child.send({ message: 'from parent at fork' })
    }, 1000)
  })

  child.send({ message: 'initial message from parent' })
}

export default fork
