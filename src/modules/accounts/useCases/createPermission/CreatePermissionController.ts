import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { CreatePermissionUseCase } from './CreatePermissionUseCase'

class CreatePermissionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      const createPermissionUseCase = container.resolve(CreatePermissionUseCase)

      const permission = await createPermissionUseCase.execute({
        name,
        description,
      })

      return response.status(StatusCodes.CREATED).json(permission)
    } catch (error) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message })
    }
  }
}
export { CreatePermissionController }
