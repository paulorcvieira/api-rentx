import { getRepository, Repository } from 'typeorm'

import { ICreateSpecificationDTO } from '../../dtos/ISpecificationDTO'
import { Specification } from '../../entities/Specification'
import { ISpecificationsRepository } from '../ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  private static INSTANCE: ISpecificationsRepository

  private constructor() {
    this.repository = getRepository(Specification)
  }

  public static getInstance(): ISpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository()

      return SpecificationsRepository.INSTANCE
    }

    return SpecificationsRepository.INSTANCE
  }

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description })
    await this.repository.save(specification)
    return specification
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ where: { name } })
    return specification
  }

  public async list(): Promise<Specification[]> {
    const specifications = await this.repository.find()
    return specifications
  }
}

export { SpecificationsRepository }
