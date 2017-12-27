import Car from './car'

export default class SportsCar extends Car {
  constructor(name) {
    super()
    this.name = name
  }

  ride() {
    this.energy -= 20
    super.ride()
  }
}
