import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/repositories/implementations/DayjsDateProvider'
import AppException from '@shared/exceptions/AppException'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider
let minDurationRental: number
let dateNow: Date
let dayAdd24Hours: Date

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
    )
    minDurationRental = 24
    dateNow = dayjsDateProvider.dateNow()
    dayAdd24Hours = dayjsDateProvider.addHours(dateNow, minDurationRental)
  })

  test('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: 'valid_user_id',
      car_id: 'valid_car_id',
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  test('should not be able to create a new rental if there is another open to de same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'valid_user_id',
        car_id: 'valid_car_id',
        expected_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        user_id: 'valid_user_id',
        car_id: 'valid_car_id',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppException)
  })

  test('should not be able to create a new rental if there is another open to de same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'valid_user_id',
        car_id: 'valid_car_id',
        expected_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        user_id: 'valid_user_id',
        car_id: 'valid_car_id',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppException)
  })

  test('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'valid_user_id',
        car_id: 'valid_car_id',
        expected_return_date: dateNow,
      })
    }).rejects.toBeInstanceOf(AppException)
  })
})
