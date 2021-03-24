import { inject, injectable } from 'tsyringe'

import { Specification } from '../../entities/Specification'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequestDTO {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository,
  ) {}

  public async execute({
    name,
    description,
  }: IRequestDTO): Promise<Specification> {
    const specificationExists = await this.specificationRepository.findByName(
      name,
    )

    if (specificationExists) {
      throw new Error('Specification already exists.')
    }

    const specification = await this.specificationRepository.create({
      name,
      description,
    })

    return specification
  }
}

export { CreateSpecificationUseCase }
