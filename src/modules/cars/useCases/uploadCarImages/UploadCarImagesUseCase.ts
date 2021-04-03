import { inject, injectable } from 'tsyringe'

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  public async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const cars: CarImage[] = []
    images_name.map(async image => {
      cars.push(await this.carsImagesRepository.create(car_id, image))
    })

    return cars
  }
}

export { UploadCarImagesUseCase }
