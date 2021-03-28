import csvParse from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  private async loadCategories(
    file: Express.Multer.File,
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []
      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', async line => {
          const [name, description] = line
          categories.push({ name, description })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', err => {
          reject(err)
        })
    })
  }

  public async execute(file: Express.Multer.File): Promise<Category[]> {
    const categoriesOnFile = await this.loadCategories(file)

    const categories: Category[] = []

    categoriesOnFile.map(async ({ name, description }) => {
      const categoryExists = await this.categoriesRepository.findByName(name)

      if (!categoryExists) {
        const category = await this.categoriesRepository.create({
          name,
          description,
        })

        categories.push(category)
      }
    })

    return categories
  }
}

export { ImportCategoriesUseCase }
