import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  public async create({
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

  async findAvailable(
    category_id: string,
    brand: string,
    name: string,
  ): Promise<Car[]> {
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
}

export { CarsRepositoryInMemory }
