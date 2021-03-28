import { StatusCodes } from 'http-status-codes'
import { injectable, inject } from 'tsyringe'

import AppException from '../../../../shared/exceptions/AppException'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequestDTO {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name, description }: IRequestDTO): Promise<Category> {
    const categoryExists = await this.categoriesRepository.findByName(name)

    if (categoryExists) {
      throw new AppException(
        'This categoryis already registered.',
        StatusCodes.CONFLICT,
      )
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    })

    return category
  }
}

export { CreateCategoryUseCase }
