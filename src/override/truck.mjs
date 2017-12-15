import { Car } from './car'

export class Truck extends Car {
  constructor(name) {
    super();
    this.name = name;
  }

  ride() {
    console.log('TruckCar ride');
  }
}