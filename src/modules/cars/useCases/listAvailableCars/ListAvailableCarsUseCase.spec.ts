import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'

import {
  CreateCarUseCase,
  ListAvailableCarsUseCase,
  CreateCategoryUseCase,
} from '../index'

let createCarUseCase: CreateCarUseCase
let listAvailableCarsUseCase: ListAvailableCarsUseCase
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
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    )
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
    category = await createCategoryUseCase.execute({
      name: 'valid_category',
      description: 'valid_description',
    })
  })

  test('should be able to list all available cars', async () => {
    const car = await createCarUseCase.execute({
      name: 'valid_name_one',
      description: 'valid_description_one',
      daily_rate: 100,
      license_plate: 'valid_plate_one',
      fine_amount: 60,
      brand: 'valid_brand_one',
      category_id: `${category.id}`,
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  test('should be able to list all available cars by brand', async () => {
    const car = await createCarUseCase.execute({
      name: 'valid_name_two',
      description: 'valid_description_two',
      daily_rate: 100,
      license_plate: 'valid_plate_two',
      fine_amount: 60,
      brand: 'valid_brand_two',
      category_id: `${category.id}`,
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'valid_brand_two',
    })

    expect(cars).toEqual([car])
  })

  test('should be able to list all available cars by name', async () => {
    const car = await createCarUseCase.execute({
      name: 'valid_name_three',
      description: 'valid_description_three',
      daily_rate: 100,
      license_plate: 'valid_plate_three',
      fine_amount: 60,
      brand: 'valid_brand_three',
      category_id: `${category.id}`,
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: 'valid_name_three',
    })

    expect(cars).toEqual([car])
  })

  test('should be able to list all available cars by category', async () => {
    const car = await createCarUseCase.execute({
      name: 'valid_name_four',
      description: 'valid_description_four',
      daily_rate: 100,
      license_plate: 'valid_plate_four',
      fine_amount: 60,
      brand: 'valid_brand_four',
      category_id: `${category.id}`,
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: `${category.id}`,
    })

    expect(cars).toEqual([car])
  })
})
