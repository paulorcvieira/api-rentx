import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ImportCategoriesUseCase } from './ImportCategoriesUseCase'

class ImportCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request

      const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase)

      const categories = await importCategoriesUseCase.execute(file)

      return response.status(201).json(categories)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { ImportCategoriesController }
