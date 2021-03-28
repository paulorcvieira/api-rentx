import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
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

      return response.status(StatusCodes.CREATED).json(user)
    } catch (error) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message })
    }
  }
}
export { CreateUserController }
