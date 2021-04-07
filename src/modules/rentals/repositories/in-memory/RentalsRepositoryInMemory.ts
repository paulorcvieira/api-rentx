import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  public async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()
    Object.assign(rental, { ...data, start_date: new Date() })
    this.rentals.push(rental)
    return rental
  }

  public async findOpenRentalByCarId(
    car_id: string,
  ): Promise<Rental | undefined> {
    const rental = this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    )
    return rental
  }
  public async findOpenRentalByUserId(
    user_id: string,
  ): Promise<Rental | undefined> {
    const rental = this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    )
    return rental
  }

  public async findById(car_id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find(rental => rental.car_id === car_id)
    return rental
  }
}

export { RentalsRepositoryInMemory }
