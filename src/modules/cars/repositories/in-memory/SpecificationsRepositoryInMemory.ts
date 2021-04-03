import { ICreateSpecificationDTO } from '@modules/cars/dtos/ISpecificationDTO'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

import { ISpecificationsRepository } from '../ISpecificationsRepository'

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = []

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
    })

    this.specifications.push(specification)

    return specification
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(
      specification => specification.name === name,
    )
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(specification =>
      ids.includes(specification.id as string),
    )

    return specifications
  }

  public async list(): Promise<Specification[]> {
    return this.specifications
  }
}

export { SpecificationsRepositoryInMemory }
