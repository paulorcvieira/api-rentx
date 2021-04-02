import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import AppException from '@shared/exceptions/AppException'

import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  test('should be able to register a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'valid_name_one',
      description: 'valid_description_one',
      daily_rate: 100,
      license_plate: 'valid_plate_one',
      fine_amount: 60,
      brand: 'valid_brand_one',
      category_id: 'valid_category_one',
    })

    expect(car).toHaveProperty('id')
  })

  test('should not be able to register a car with a license plate already registered', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'valid_name_two',
        description: 'valid_description_two',
        daily_rate: 100,
        license_plate: 'valid_plate_two',
        fine_amount: 60,
        brand: 'valid_brand_two',
        category_id: 'valid_category_two',
      })

      await createCarUseCase.execute({
        name: 'valid_name_two',
        description: 'valid_description_two',
        daily_rate: 100,
        license_plate: 'valid_plate_two',
        fine_amount: 60,
        brand: 'valid_brand_two',
        category_id: 'valid_category_two',
      })
    }).rejects.toBeInstanceOf(AppException)
  })

  test('should be able to register a car as available by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'valid_name_three',
      description: 'valid_description_three',
      daily_rate: 100,
      license_plate: 'valid_plate_three',
      fine_amount: 60,
      brand: 'valid_brand_three',
      category_id: 'valid_category_three',
    })

    expect(car.available).toBe(true)
  })
})
