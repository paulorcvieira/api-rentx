import { Request, Response } from 'express'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      const specification = await this.createSpecificationUseCase.execute({
        name,
        description,
      })

      return response.status(201).json(specification)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { CreateSpecificationController }
