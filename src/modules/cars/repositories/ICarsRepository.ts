import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { IFindCarsAvailable } from '../dtos/IFindCarsAvailable'
import { Car } from '../infra/typeorm/entities/Car'

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car | undefined>
  findAvailable(data: IFindCarsAvailable): Promise<Car[]>
  findById(car_id: string): Promise<Car | undefined>
}

export { ICarsRepository }
