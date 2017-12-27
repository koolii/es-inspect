import Car from './car'

export default class Truck extends Car {
  constructor(name) {
    super()
    this.name = name
  }

  static ride() {
    console.log('TruckCar ride')
  }
}
