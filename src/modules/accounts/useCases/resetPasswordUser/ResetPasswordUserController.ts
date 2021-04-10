import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase'

export class ResetPasswordUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.query
      const { password } = request.body

      const resetPasswordUserUseCase = container.resolve(
        ResetPasswordUserUseCase,
      )

      const refresh_token = await resetPasswordUserUseCase.execute({
        password: password as string,
        token: token as string,
      })

      return response.status(StatusCodes.OK).json(refresh_token)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}
