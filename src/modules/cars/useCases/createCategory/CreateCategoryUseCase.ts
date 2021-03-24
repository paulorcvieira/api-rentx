import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequestDTO {
  name: string
  description: string
}

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  public async execute({ name, description }: IRequestDTO): Promise<Category> {
    const categoryExists = await this.categoryRepository.findByName(name)

    if (categoryExists) {
      throw new Error('Category already exists')
    }

    const category = await this.categoryRepository.create({
      name,
      description,
    })

    return category
  }
}

export { CreateCategoryUseCase }
