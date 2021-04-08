import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { ImportCategoriesUseCase } from './ImportCategoriesUseCase'

class ImportCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request

      const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase)

      const categories = await importCategoriesUseCase.execute(file)

      return response.status(StatusCodes.CREATED).json(categories)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}

export { ImportCategoriesController }
