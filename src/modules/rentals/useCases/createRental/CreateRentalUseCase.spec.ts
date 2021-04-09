import { StatusCodes } from 'http-status-codes'

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/repositories/implementations/DayjsDateProvider'
import AppException from '@shared/exceptions/AppException'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider
let minDurationRental: number
let dateNow: Date
let dayAdd24Hours: Date

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    )
    minDurationRental = 24
    dateNow = dayjsDateProvider.dateNow()
    dayAdd24Hours = dayjsDateProvider.addHours(dateNow, minDurationRental)
  })

  test('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'valid_car_name',
      description: 'valid_car_description',
      daily_rate: 200,
      license_plate: 'valid_car_license_plate',
      fine_amount: 60,
      brand: 'valid_car_brand',
      category_id: 'valid_car_category_id',
    })

    const rental = await createRentalUseCase.execute({
      user_id: 'valid_user_id',
      car_id: car.id as string,
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  test('should not be able to create a new rental if there is another open to de same user', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'valid_car_name',
      description: 'valid_car_description',
      daily_rate: 200,
      license_plate: 'valid_car_license_plate',
      fine_amount: 60,
      brand: 'valid_car_brand',
      category_id: 'valid_car_category_id',
    })

    await createRentalUseCase.execute({
      user_id: 'valid_user_id',
      car_id: car.id as string,
      expected_return_date: dayAdd24Hours,
    })

    await expect(
      createRentalUseCase.execute({
        user_id: 'valid_user_id',
        car_id: 'valid_car_id',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(
      new AppException(
        'This user already has an active rental.',
        StatusCodes.UNAUTHORIZED,
      ),
    )
  })

  test('should not be able to create a new rental if there is another open to de same car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'valid_car_name',
      description: 'valid_car_description',
      daily_rate: 200,
      license_plate: 'valid_car_license_plate',
      fine_amount: 60,
      brand: 'valid_car_brand',
      category_id: 'valid_car_category_id',
    })

    await createRentalUseCase.execute({
      user_id: 'valid_user_id',
      car_id: car.id as string,
      expected_return_date: dayAdd24Hours,
    })

    await expect(
      createRentalUseCase.execute({
        user_id: 'valid_user_id',
        car_id: 'valid_car_id',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(
      new AppException(
        'This user already has an active rental.',
        StatusCodes.UNAUTHORIZED,
      ),
    )
  })

  test('should not be able to create a new rental with invalid return time', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'valid_car_name',
      description: 'valid_car_description',
      daily_rate: 200,
      license_plate: 'valid_car_license_plate',
      fine_amount: 60,
      brand: 'valid_car_brand',
      category_id: 'valid_car_category_id',
    })

    await expect(
      createRentalUseCase.execute({
        user_id: 'valid_user_id',
        car_id: car.id as string,
        expected_return_date: dateNow,
      }),
    ).rejects.toEqual(
      new AppException(
        'Minimum rental time has not been reached.',
        StatusCodes.UNAUTHORIZED,
      ),
    )
  })
})
