import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car } from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  public async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data)
    await this.repository.save(data)
    return car
  }

  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate })
    return car
  }

  public async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('car')
      .where('available = :available', { available: true })

    if (category_id) {
      carsQuery.andWhere('car.category_id = :category_id', { category_id })
    }

    if (brand) {
      carsQuery.andWhere('car.brand = :brand', { brand })
    }

    if (name) {
      carsQuery.andWhere('car.name = :name', { name })
    }

    const cars = await carsQuery.getMany()

    return cars
  }
}
export { CarsRepository }
