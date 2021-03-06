import { inject, injectable } from 'tsyringe'

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/repositories/IStorageProvider'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.forEach(async image => {
      await this.storageProvider.saveFile('cars', image)
      await this.carsImagesRepository.create(car_id, image)
    })
  }
}

export { UploadCarImagesUseCase }
