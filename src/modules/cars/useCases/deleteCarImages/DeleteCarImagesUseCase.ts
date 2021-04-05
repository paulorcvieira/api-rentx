import { inject, injectable } from 'tsyringe'

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'

interface IRequest {
  images_id: string[]
}

@injectable()
class DeleteCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  public async execute({ images_id }: IRequest): Promise<void> {
    await this.carsImagesRepository.delete(images_id)
  }
}

export { DeleteCarImagesUseCase }
