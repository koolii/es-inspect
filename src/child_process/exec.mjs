import childProcess from 'child_process'
import headline from './log'

const exec = () => {
  headline('exec')

  // パイプを使ったシェルの記述が可能
  // そのまま使用するとシェルインジェクション等もアリ得るので注意されたし
  childProcess.exec('ls -la | grep *.json', (err, stdout) => {
    if (err) {
      console.log(`err: ${err.stack}`)
    }
    console.log(`result: ${stdout}`)
  })
}

export default exec
