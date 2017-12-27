import childProcess from 'child_process'
import headline from './log'

const execFile = () => {
  headline('exec-file')
  console.log(`parent-pid: ${process.pid}`)

  // 子プロセスを生成し、コマンドが終了するまで待機する(同期的な処理となる)
  const child = childProcess.execFile('ls', ['-l'], (err, stdout) => {
    if (err) {
      console.log(err.stack)
    }
    console.log(stdout)
    console.log(`child-pid: ${child.pid}`)
  })
}

export default execFile
