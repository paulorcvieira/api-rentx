import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateRoleUseCase } from './CreateRoleUseCase'

class CreateRoleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description, permission } = request.body

      const createRoleUseCase = container.resolve(CreateRoleUseCase)

      const role = await createRoleUseCase.execute({
        name,
        description,
        permission,
      })

      return response.status(201).json(role)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
export { CreateRoleController }
