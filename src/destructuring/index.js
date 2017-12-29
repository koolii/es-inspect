const getDummy = () => [0, 0]

const list = [
  { dummy1: 0, dummy2: 0 },
  { dummy1: 0, dummy2: 0 },
]

const resultA = getDummy()
/* eslint-disable prefer-destructuring */
list[0].dummy1 = resultA[0]
/* eslint-disable prefer-destructuring */
list[0].dummy2 = resultA[1]

const resultB = getDummy()
/* eslint-disable prefer-destructuring */
list[1].dummy1 = resultB[0]
/* eslint-disable prefer-destructuring */
list[1].dummy2 = resultB[0]

console.log('↑のeslintのエラーを解決する')
