import { Calc, hello, User } from './export'

console.log(hello)

console.log(Calc.add(100, 50))
console.log(Calc.multi(100, 50))
console.log(Calc.sub(100, 50))

const bob = new User('bob', 25)
bob.say()
