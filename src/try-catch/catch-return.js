const catchReturn = (num = 100) => {
  try {
    if (num % 5 === 0) {
      throw -1
    } else {
      return num
    }
  } catch (e) {
    return e
  }
}

for (let i = 0; i <= 100; i += 1) {
  console.log(catchReturn(i))
}
