import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'

class CarsImagesRepositoryInMemory implements ICarsImagesRepository {
  images: CarImage[] = []

  public async create(car_id: string, image_name: string): Promise<CarImage> {
    const image = new CarImage()
    Object.assign(image, {
      car_id,
      image_name,
    })
    this.images.push(image)
    return image
  }

  public async delete(images_id: string[]): Promise<CarImage[]> {
    images_id.filter(id => {
      const imageIndex = this.images.findIndex(image => image.id === id)
      return this.images.splice(imageIndex, 1)
    })
    return this.images
  }

  public async list(car_id: string): Promise<CarImage[]> {
    const images = this.images.filter(image => image.car_id === car_id)
    return images
  }
}

export { CarsImagesRepositoryInMemory }
