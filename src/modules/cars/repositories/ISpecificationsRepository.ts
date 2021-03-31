import { ICreateSpecificationDTO } from '../dtos/ISpecificationDTO'
import { Specification } from '../infra/typeorm/entities/Specification'

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>
  findByName(name: string): Promise<Specification | undefined>
  list(): Promise<Specification[]>
}

export { ISpecificationsRepository }
