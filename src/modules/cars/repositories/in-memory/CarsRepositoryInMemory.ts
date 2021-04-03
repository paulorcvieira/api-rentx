import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { IFindCarsAvailable } from '@modules/cars/dtos/IFindCarsAvailable'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  public async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    })

    this.cars.push(car)

    return car
  }

  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Car | undefined> {
    const car = this.cars.find(car => car.license_plate === license_plate)
    return car
  }

  public async findAvailable({
    category_id,
    brand,
    name,
  }: IFindCarsAvailable): Promise<Car[]> {
    let cars: Car[] = []

    const availableCars = this.cars.filter(car => car.available === true)

    if (!category_id && !brand && !name) {
      cars = availableCars
    }

    if (category_id) {
      cars = availableCars.filter(car => car.category_id === category_id)
    }

    if (brand) {
      cars = availableCars.filter(car => car.brand === brand)
    }

    if (name) {
      cars = availableCars.filter(car => car.name === name)
    }

    return cars
  }

  public async findById(car_id: string): Promise<Car | undefined> {
    const car = this.cars.find(car => car.id === car_id)
    return car
  }
}

export { CarsRepositoryInMemory }
