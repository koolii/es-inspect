import Car from './car'

export default class Bus extends Car {
  constructor(name) {
    super()
    this.name = name
    this.energy = 200
  }
  // omit ride()
}
