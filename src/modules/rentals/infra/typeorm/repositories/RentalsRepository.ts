import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

import { Rental } from '../entities/Rental'

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  public async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data)
    await this.repository.save(rental)
    return rental
  }

  public async findOpenRentalByCarId(
    car_id: string,
  ): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null },
    })
    return rental
  }

  public async findOpenRentalByUserId(
    user_id: string,
  ): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: null },
    })
    return rental
  }

  public async findById(rental_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne(rental_id)
    return rental
  }
}

export { RentalsRepository }
