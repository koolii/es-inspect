/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

const outerScopeVer = () => {
  if (createNumGenerator) {
    console.log('createNumGenerator() has already defined.')
  }
  function* createNumGenerator() {
    let id = 0
    while (true) {
      id += 1
      if (Number.MAX_VALUE <= id) {
        id = 0
      }
      yield id
    }
  }

  const $ = createNumGenerator()
  return () => $.next().value
}


function innerScopeVer() {
  if (forbiddenAccessGenerator) {
    console.log('forbiddenAccessGenerator() has already defined.')
  }

  function* forbiddenAccessGenerator() {
    let id = 0
    while (true) {
      id += 1
      if (Number.MAX_VALUE <= id) {
        id = 0
      }
      yield id
    }
  }
  const $ = forbiddenAccessGenerator()
  return () => $.next().value
}

const outer = outerScopeVer()
console.log(`[x] next => ${outer()}`)
console.log(`[x] next => ${outer()}`)
console.log(`[x] next => ${outer()}`)

const inner = innerScopeVer()
console.log(`[y] next => ${inner()}`)
console.log(`[y] next => ${inner()}`)
console.log(`[y] next => ${inner()}`)
console.log(`[y] next => ${inner()}`)

// constのスコープはこのファイルのグローバルだからアクセスできそうなのに
// ↓のgeneratorにアクセスすることは出来ない
if (typeof createNumGenerator !== 'undefined') {
  console.log(createNumGenerator)
}

// functionを使うと独自のスコープになるので、↓のgeneratorにアクセスすることは出来ない
if (typeof forbiddenAccessGenerator !== 'undefined') {
  console.log(forbiddenAccessGenerator)
}
