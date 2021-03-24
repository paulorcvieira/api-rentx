import { Category } from '../../entities/Category'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  public async execute(): Promise<Category[]> {
    const specifications = await this.specificationsRepository.list()

    return specifications
  }
}

export { ListSpecificationsUseCase }
