import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import AppException from '@shared/exceptions/AppException'

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate,
    )

    if (carAlreadyExists) {
      throw new AppException(
        'This license plate is already registered.',
        StatusCodes.CONFLICT,
      )
    }

    const categoryExists = await this.categoriesRepository.findById(category_id)

    if (!categoryExists) {
      throw new AppException(
        'This category is not registered.',
        StatusCodes.CONFLICT,
      )
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    })

    return car
  }
}

export { CreateCarUseCase }
