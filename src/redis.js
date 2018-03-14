const { promisify } = require('util');
const Redis = require('redis')

const createClient = (config) => {
  const client = Redis.createClient(config)
  client.on('error', err => {
    console.log(`error: [obj:${err}, msg: ${JSON.stringify(err)}]`)
  })
  return {
    client,
    del: promisify((client.del).bind(client)),
    setnx: promisify((client.setnx).bind(client)),
    setex: promisify((client.setex).bind(client)),
  }
}

const sleepSec = (x) => new Promise((resolve) => {
  setTimeout(resolve, x * 1000)
})

const EXPIRE = 3;
const redis = createClient({
  host: '127.0.0.1',
  port: 6379,
  db: 0,
})

async function register(key, value, cnt = 1) {
  if (!key || key === '') {
    throw new Error('key should be string.')
  }
  if (!value || value === '') {
    throw new Error('value should be string.')
  }

  try {
    if (cnt > 5) {
      throw new Error('failed register in Redis because of count is over.')
    }

    // await redis.del(`LOCK_${key}`)
    const successLock = await redis.setnx(`LOCK_${key}`, 1)

    if (!successLock) {
      console.warn(`retry after waiting. count(${cnt}), key(${key}), value(${value})`)
      await sleepSec(3)
      return await register(key, value, cnt + 1)
    }

    console.log(`* LOCKED(${key})`)

    if (await redis.setex('token', EXPIRE, value) !== 'OK') {
      throw new Error(`failed register value[${value}] in Redis.`)
    }

    // for testing lock
    await sleepSec(5)

    await redis.del(`LOCK_${key}`)
    console.log(`* UNLOCKED(${key})`)

    return true
  } catch (err) {
    console.error(err.message)
    return false
  }
}

;(async () => {

  // console.log(redis.client.__proto__)
  // 有効期間を設定しつつデータをredisに登録する
  // http://redis.shibu.jp/commandreference/strings.html#command-SETEX

  console.log(`
1. 最初にロックされているかどうかをsetnxで確認
2. ロックされていた場合はsleepして再度実行
3. 問題なければロック
4. setex()を使ってset/expireを設定
5. その後、ロックを解除する
`)

  setTimeout(async () => {
    console.log(`result => ${await register('key-register', 'dummy-sample-string')}`)

    process.nextTick(() => {
      console.log('=> FIN')
      process.exit(0)
    })
  }, 1000)

  console.log(`result => ${await register('key-register', Date.now())}`)
})()
