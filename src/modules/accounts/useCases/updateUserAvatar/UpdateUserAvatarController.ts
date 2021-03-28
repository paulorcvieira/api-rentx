import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    const user = await updateUserAvatarUseCase.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    return response.status(StatusCodes.CREATED).json(user)
  }
}

export { UpdateUserAvatarController }
