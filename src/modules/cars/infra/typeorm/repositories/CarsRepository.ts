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
}
export { CarsRepository }
