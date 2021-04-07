import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/repositories/IDateProvider'
import AppException from '@shared/exceptions/AppException'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minDurationRental = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id,
    )

    if (carUnavailable) {
      throw new AppException(
        'This car is currently unavailable.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(
      user_id,
    )

    if (rentalOpenToUser) {
      throw new AppException(
        'This user already has an active rental.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    )

    if (compare < minDurationRental) {
      throw new AppException(
        'Minimum rental time has not been reached.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}

export { CreateRentalUseCase }
