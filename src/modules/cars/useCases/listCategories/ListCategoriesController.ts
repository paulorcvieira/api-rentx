import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

class ListCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

      const categories = await listCategoriesUseCase.execute()

      return response.status(StatusCodes.OK).json(categories)
    } catch (error) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message })
    }
  }
}

export { ListCategoriesController }
