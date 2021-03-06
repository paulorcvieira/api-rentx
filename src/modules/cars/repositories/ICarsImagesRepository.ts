import { CarImage } from '../infra/typeorm/entities/CarImage'

interface ICarsImagesRepository {
  create(car_id: string, images_name: string): Promise<CarImage>
  delete(images_id: string[]): Promise<CarImage[] | void>
  deleteAllByCarId(car_id: string): Promise<void>
  list(car_id: string): Promise<CarImage[]>
}

export { ICarsImagesRepository }
