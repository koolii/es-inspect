import Truck from './truck'
import SportsCar from './sports-car'
import Bus from './bus'

const truck = new Truck('TruckA')
const roadStar = new SportsCar('RoadStar')
const bus = new Bus('SakuraBus')

truck.ride()
roadStar.ride()
bus.ride()
