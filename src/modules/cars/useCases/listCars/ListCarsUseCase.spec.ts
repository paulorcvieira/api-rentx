import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'

import {
  CreateCarUseCase,
  ListCarsUseCase,
  CreateCategoryUseCase,
} from '../index'

let createCarUseCase: CreateCarUseCase
let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
let createCategoryUseCase: CreateCategoryUseCase
let category: Category

describe('List Cars', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory,
    )
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
    category = await createCategoryUseCase.execute({
      name: 'valid_category',
      description: 'valid_description',
    })
  })

  test('should be able list the cars', async () => {
    await createCarUseCase.execute({
      name: 'valid_name',
      description: 'valid_description',
      daily_rate: 100,
      license_plate: 'valid_plate',
      fine_amount: 60,
      brand: 'valid_brand',
      category_id: `${category.id}`,
    })

    const cars = await listCarsUseCase.execute()

    expect(cars).toBeTruthy()
  })
})
