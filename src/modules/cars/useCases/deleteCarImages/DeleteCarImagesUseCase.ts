import { inject, injectable } from 'tsyringe'

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/repositories/IStorageProvider'

interface IRequest {
  car_id: string
}

@injectable()
class DeleteCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ car_id }: IRequest): Promise<void> {
    const images = await this.carsImagesRepository.list(car_id)
    images.forEach(image =>
      this.storageProvider.deleteFile('cars', image.image_name),
    )
    await this.carsImagesRepository.deleteAllByCarId(car_id)
  }
}

export { DeleteCarImagesUseCase }
