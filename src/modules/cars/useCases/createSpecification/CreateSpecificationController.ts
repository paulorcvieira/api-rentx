import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

class CreateSpecificationController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase,
      )

      const specification = await createSpecificationUseCase.execute({
        name,
        description,
      })

      return response.status(StatusCodes.CREATED).json(specification)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}

export { CreateSpecificationController }
