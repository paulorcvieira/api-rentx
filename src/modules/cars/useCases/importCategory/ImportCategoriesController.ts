import { Request, Response } from 'express'

import { ImportCategoriesUseCase } from './ImportCategoriesUseCase'

class ImportCategoriesController {
  constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request

      const categories = await this.importCategoriesUseCase.execute(file)

      return response.status(200).json(categories)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { ImportCategoriesController }
