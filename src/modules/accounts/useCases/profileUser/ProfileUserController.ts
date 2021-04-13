import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { ProfileUserUseCase } from './ProfileUserUseCase'

export class ProfileUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id

      const profileUserUseCase = container.resolve(ProfileUserUseCase)

      const roles = await profileUserUseCase.execute(user_id)

      return response.status(StatusCodes.CREATED).json(roles)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}
