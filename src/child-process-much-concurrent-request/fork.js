const pathResolver = require('path')
const childProcess = require('child_process')

module.exports = class Fork {
  constructor(path) {
    // 単純な構造だと、例えばユーザ単位で複数のアクションがあると一括で削除しかねないから危ない
    this.store = {}
    this.path = path
    this.cp = null
  }

  async create() {
    this.cp = await this.createCp()
  }

  createCp() {
    return new Promise((resolve, reject) => {
      try {
        const child = childProcess.fork(this.path, [], {
          cwd: pathResolver.resolve(__dirname),
        })

        if (!child.connected) {
          reject(new Error('failed to create child process'))
        }

        child.on('message', (response) => {
          const id = response.id
          // console.log(`[onMessage] ${id}`)
          console.log(`[STORE] resolvers are [${Object.keys(this.store)}]`)

          // this.storeからreq.id==response.idで一意に定めたresolverを実行
          const done = this.store[id]
          delete this.store[id]

          done(response)
        })
        child.on('disconnect', () => {
          console.log('[PARENT] disconnect child process')
          process.kill(child.pid)
        })

        resolve(child)
      } catch (err) {
        reject(err.message || err)
      }
    })
  }

  // Promiseの終了をフックをインスタンス側に持たせる
  setResolver(id, resolver) {
    // これで全体でユーザからのリクエストをresolveさせることが可能になる
    this.store[id] = resolver
  }

  // この時点でsend()はPromiseを返却しているから、あとはいつどこでresolveを実行するか
  send(id, msg) {
    return new Promise((resolve) => {
      // const id = id; // ちゃんと作るならuuidを生成等を行なう
      this.setResolver(id, resolve)
      this.cp.send({ id, msg })
    })
  }

  disconnect() {
    process.kill(this.cp.pid)
  }
}
