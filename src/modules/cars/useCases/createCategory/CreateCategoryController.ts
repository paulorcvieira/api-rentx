import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

      const category = createCategoryUseCase.execute({
        name,
        description,
      })

      return response.status(201).json(category)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
export { CreateCategoryController }
