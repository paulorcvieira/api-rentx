import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

      const category = await createCategoryUseCase.execute({
        name,
        description,
      })

      return response.status(StatusCodes.CREATED).json(category)
    } catch (error) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message })
    }
  }
}
export { CreateCategoryController }
