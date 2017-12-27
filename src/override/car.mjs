export default class Car {
  constructor() {
    this.name = 'car'
    this.energy = 100
  }

  ride() {
    this.energy -= 10
    console.log(`${this.name}'s left: ${this.energy}`)
  }
}
