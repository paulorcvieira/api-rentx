import { v4 as uuidV4 } from 'uuid'

import { CarsImagesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsImagesRepositoryInMemory'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import { DeleteCarImagesUseCase } from './DeleteCarImagesUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let carsImagesRepositoryInMemory: CarsImagesRepositoryInMemory
let deleteCarImagesUseCase: DeleteCarImagesUseCase

describe('Delete Car Images', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    carsImagesRepositoryInMemory = new CarsImagesRepositoryInMemory()
    deleteCarImagesUseCase = new DeleteCarImagesUseCase(
      carsImagesRepositoryInMemory,
    )
  })

  test('should be able to delete the images', async () => {
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

    const image = await carsImagesRepositoryInMemory.create(
      car.id as string,
      'valid_image_name',
    )

    await deleteCarImagesUseCase.execute({
      images_id: [image.id as string],
    })

    const carImages = await carsImagesRepositoryInMemory.list(car.id as string)

    expect(carImages.length).toBe(0)
  })
})
