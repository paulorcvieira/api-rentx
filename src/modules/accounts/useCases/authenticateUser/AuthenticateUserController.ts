import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body

      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

      const session = await authenticateUserUseCase.execute({
        username,
        password,
      })

      return response.status(201).json(session)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
export { AuthenticateUserController }
