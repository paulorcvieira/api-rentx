import crypto from 'crypto'

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory'
import AppException from '@shared/exceptions/AppException'

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

const generate = () => {
  return crypto.randomBytes(9).toString('hex')
}

describe('Specifications Car', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    )
  })

  it('Should not be able to create a new specification to the non-existent car', async () => {
    expect(async () => {
      const car_id = generate()
      const specifications_id = [generate()]

      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    }).rejects.toBeInstanceOf(AppException)
  })

  it('Should be able to create a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
      daily_rate: 200,
      license_plate: generate(),
      fine_amount: 60,
      brand: generate(),
      category_id: generate(),
    })

    const specification = await specificationsRepositoryInMemory.create({
      name: generate(),
      description: generate(),
    })

    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id as string,
      specifications_id: [specification.id] as string[],
    })

    expect(carSpecifications).toHaveProperty('specifications')
    expect(carSpecifications.specifications.length).toBe(1)
  })
})
