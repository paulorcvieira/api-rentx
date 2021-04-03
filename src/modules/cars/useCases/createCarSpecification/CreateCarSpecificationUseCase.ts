import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import AppException from '@shared/exceptions/AppException'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository,
  ) {}

  public async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id)

    if (!carExists) {
      throw new AppException(
        'This car is not registered.',
        StatusCodes.BAD_REQUEST,
      )
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id,
    )

    Object.assign(carExists, { specifications })

    const car = await this.carsRepository.create(carExists)

    return car
  }
}

export { CreateCarSpecificationUseCase }
