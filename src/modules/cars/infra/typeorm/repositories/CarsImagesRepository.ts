import { getRepository, Repository } from 'typeorm'

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'

import { CarImage } from '../entities/CarImage'

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  public async create(car_id: string, image_name: string): Promise<CarImage> {
    const image = this.repository.create({ car_id, image_name })
    await this.repository.save(image)
    return image
  }

  public async delete(images_id: string[]): Promise<void> {
    await this.repository.delete(images_id)
  }

  public async deleteAllByCarId(car_id: string): Promise<void> {
    const images = await this.repository.find({ car_id })
    images.map(image => this.repository.delete(image.id as string))
  }

  public async list(car_id: string): Promise<CarImage[]> {
    const images = await this.repository.find({ car_id })
    return images
  }
}

export { CarsImagesRepository }
