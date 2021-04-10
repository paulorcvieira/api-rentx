import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { emailOrUsername, password } = request.body
      const ip_address = request.ip

      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

      const authenticate = await authenticateUserUseCase.execute({
        emailOrUsername,
        password,
        ip_address,
      })

      return response.status(StatusCodes.CREATED).json(authenticate)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}

export { AuthenticateUserController }
