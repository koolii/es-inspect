import { Car } from './car'

export class Bus extends Car {
  constructor(name) {
    super();
    this.name = name;
    this.energy = 200;
  }
  // omit ride()
}