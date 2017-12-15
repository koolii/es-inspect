export const hello = 'hello world';

export class Calc {
  static add(a, b) { return a + b; }
  static multi(a, b) { return a * b; }
  static sub(a, b) { return a - b; }
}

export class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  say() {
    console.log(`Hi! My name is ${this.name}. It's ${this.age} years old.`);
  }
}