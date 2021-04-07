import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/repositories/IDateProvider'
import AppException from '@shared/exceptions/AppException'

interface IRequest {
  rental_id: string
  user_id: string
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ rental_id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id)
    const minimum_daily = 1

    if (!rental) {
      throw new AppException(
        'This rent does not registered.',
        StatusCodes.NOT_FOUND,
      )
    }

    if (rental.user_id !== user_id) {
      throw new AppException(
        'The rent does not belong to this user.',
        StatusCodes.NOT_FOUND,
      )
    }

    const car = await this.carsRepository.findById(rental.car_id)

    if (!car) {
      throw new AppException(
        'This car does not registered.',
        StatusCodes.NOT_FOUND,
      )
    }

    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow)

    if (daily <= 0) {
      daily = minimum_daily
    }

    const delayDays = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    )

    let total = 0

    if (delayDays < minimum_daily) {
      const calculate_fine = delayDays * car.fine_amount
      total = calculate_fine
    }

    total += daily * car.daily_rate

    rental.end_date = dateNow
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(rental.car_id, true)

    return rental
  }
}
