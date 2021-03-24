import { Request, Response } from 'express'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  constructor(private createCategoriesUseCase: CreateCategoryUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      const category = this.createCategoriesUseCase.execute({
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
