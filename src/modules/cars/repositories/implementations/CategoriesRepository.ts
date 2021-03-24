import { getRepository, Repository } from 'typeorm'

import { ICreateCategoryDTO } from '../../dtos/ICategoryDTO'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({ name, description })
    await this.repository.save(category)
    return category
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ where: { name } })
    return category
  }

  public async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }
}

export { CategoriesRepository }
