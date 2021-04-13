import { v4 as uuidV4 } from 'uuid'

import { CarsImagesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsImagesRepositoryInMemory'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { DiskStorageProvider } from '@shared/container/providers/StorageProvider/repositories/implementations/DiskStorageProvider'

import { DeleteCarImagesUseCase } from './DeleteCarImagesUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let carsImagesRepositoryInMemory: CarsImagesRepositoryInMemory
let deleteCarImagesUseCase: DeleteCarImagesUseCase
let storageProvider: DiskStorageProvider

describe('Delete Car Images', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    carsImagesRepositoryInMemory = new CarsImagesRepositoryInMemory()
    storageProvider = new DiskStorageProvider()
    deleteCarImagesUseCase = new DeleteCarImagesUseCase(
      carsImagesRepositoryInMemory,
      storageProvider,
    )
  })

  test('should be able to delete car images', async () => {
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

    await carsImagesRepositoryInMemory.create(
      car.id as string,
      'valid_image_name',
    )

    await deleteCarImagesUseCase.execute({ car_id: car.id as string })

    const carImages = await carsImagesRepositoryInMemory.list(car.id as string)

    expect(carImages.length).toBe(0)
  })
})
