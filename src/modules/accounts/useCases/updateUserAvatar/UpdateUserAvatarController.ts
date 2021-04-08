import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

      const user = await updateUserAvatarUseCase.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      })

      return response.status(StatusCodes.CREATED).json(user)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}

export { UpdateUserAvatarController }
