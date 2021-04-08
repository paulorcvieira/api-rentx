import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { CreateRoleUseCase } from './CreateRoleUseCase'

class CreateRoleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description, permissions } = request.body

      const createRoleUseCase = container.resolve(CreateRoleUseCase)

      const role = await createRoleUseCase.execute({
        name,
        description,
        permissions,
      })

      return response.status(StatusCodes.CREATED).json(role)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}
export { CreateRoleController }
