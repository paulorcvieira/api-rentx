import { v4 as uuidV4 } from 'uuid'

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import { ListAvailableCarsUseCase } from '../index'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    )
  })

  test('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      id: uuidV4(),
      name: 'valid_name_one',
      description: 'valid_description_one',
      daily_rate: 100,
      license_plate: 'valid_plate_one',
      fine_amount: 60,
      brand: 'valid_brand_one',
      category_id: 'valid_category_id',
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  test('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      id: uuidV4(),
      name: 'valid_name_two',
      description: 'valid_description_two',
      daily_rate: 100,
      license_plate: 'valid_plate_two',
      fine_amount: 60,
      brand: 'valid_brand_two',
      category_id: 'valid_category_id',
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'valid_brand_two',
    })

    expect(cars).toEqual([car])
  })

  test('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      id: uuidV4(),
      name: 'valid_name_three',
      description: 'valid_description_three',
      daily_rate: 100,
      license_plate: 'valid_plate_three',
      fine_amount: 60,
      brand: 'valid_brand_three',
      category_id: 'valid_category_id',
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: 'valid_name_three',
    })

    expect(cars).toEqual([car])
  })

  test('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      id: uuidV4(),
      name: 'valid_name_four',
      description: 'valid_description_four',
      daily_rate: 100,
      license_plate: 'valid_plate_four',
      fine_amount: 60,
      brand: 'valid_brand_four',
      category_id: 'valid_category_id',
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'valid_category_id',
    })

    expect(cars).toEqual([car])
  })
})
