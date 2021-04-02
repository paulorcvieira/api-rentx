import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'
import AppException from '@shared/exceptions/AppException'

import { CreateCarUseCase, CreateCategoryUseCase } from '../index'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let category: Category

describe('Create Car', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory,
    )
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
    category = await createCategoryUseCase.execute({
      name: 'valid_category',
      description: 'valid_description',
    })
  })

  test('should be able to register a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'valid_name_one',
      description: 'valid_description_one',
      daily_rate: 100,
      license_plate: 'valid_plate_one',
      fine_amount: 60,
      brand: 'valid_brand_one',
      category_id: `${category.id}`,
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
        category_id: `${category.id}`,
      })

      await createCarUseCase.execute({
        name: 'valid_name_three',
        description: 'valid_description_three',
        daily_rate: 100,
        license_plate: 'valid_plate_three',
        fine_amount: 60,
        brand: 'valid_brand_three',
        category_id: `${category.id}`,
      })
    }).rejects.toBeInstanceOf(AppException)
  })

  test('should be able to register a car as available by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'valid_name_four',
      description: 'valid_description_four',
      daily_rate: 100,
      license_plate: 'valid_plate_four',
      fine_amount: 60,
      brand: 'valid_brand_four',
      category_id: `${category.id}`,
    })

    expect(car.available).toBe(true)
  })
})
