import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { IFindCarsAvailable } from '@modules/cars/dtos/IFindCarsAvailable'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car } from '../entities/Car'

export class CarsRepository implements ICarsRepository {
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

  public async findAvailable({
    category_id,
    brand,
    name,
  }: IFindCarsAvailable): Promise<Car[]> {
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

  public async findById(car_id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ id: car_id })
    return car
  }

  public async updateAvailable(
    car_id: string,
    available: boolean,
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :car_id')
      .setParameters({ car_id })
      .execute()
  }
}
