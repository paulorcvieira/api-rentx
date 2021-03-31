import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import AppException from '@shared/exceptions/AppException'

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
      throw new AppException(
        'This specification is already registered.',
        StatusCodes.CONFLICT,
      )
    }

    const specification = await this.specificationRepository.create({
      name,
      description,
    })

    return specification
  }
}

export { CreateSpecificationUseCase }
