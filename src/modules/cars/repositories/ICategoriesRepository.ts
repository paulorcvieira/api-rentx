import { ICreateCategoryDTO } from '../dtos/ICategoryDTO'
import { Category } from '../entities/Category'

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>
  findByName(name: string): Promise<Category | undefined>
  list(): Promise<Category[]>
}

export { ICategoriesRepository }
