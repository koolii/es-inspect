import childProcess from 'child_process'
import headline from './log'

// 参考になる => http://info-i.net/child-process-spawn
// 実行してわかるが、ストリームの取扱となるので徐々に標準出力にログが出力されている
// オプションのstdioでinheritを指定することにより、子プロセスは自身の標準入出力として親プロセスの標準入出力を使用します。
// childProcess.spawn('node', ['child-process.js'], { stdio: 'inherit' })

const spawn = () => {
  headline('spawn')
  console.log(`parent-pid: ${process.pid}`)

  const child = childProcess.spawn('top')
  console.log(`child-pid: ${child.pid}`)

  child.on('exit', () => {
    // 強制的に親プロセスがprocess.exit()されているので、子プロセスが終了してくれていない
    console.log('on exit spawn')
  })

  child.stdout.on('data', (data) => {
    console.log(`data: ${data.toString()}`)
  })
}

export default spawn
