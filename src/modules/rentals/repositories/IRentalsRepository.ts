import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO'
import { Rental } from '../infra/typeorm/entities/Rental'

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>
  findOpenRentalByCarId(car_id: string): Promise<Rental | undefined>
  findOpenRentalByUserId(user_id: string): Promise<Rental | undefined>
}
