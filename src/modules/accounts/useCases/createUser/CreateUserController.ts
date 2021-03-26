import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        username,
        password,
        email,
        driver_license,
        roles,
      } = request.body

      const createUserUseCase = container.resolve(CreateUserUseCase)

      const user = await createUserUseCase.execute({
        name,
        username,
        password,
        email,
        driver_license,
        roles,
      })

      return response.status(201).json(user)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
export { CreateUserController }
