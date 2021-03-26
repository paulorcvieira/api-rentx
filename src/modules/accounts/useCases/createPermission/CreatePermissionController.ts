import { Request, Response } from 'express'
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

      return response.status(201).json(permission)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
export { CreatePermissionController }
