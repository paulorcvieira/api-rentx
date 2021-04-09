import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { RefreshTokenUseCase } from './RefreshTokenUseCase'

export class RefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const token =
        request.body.token ||
        request.headers['x-access-token'] ||
        request.query.token

      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

      const refresh_token = await refreshTokenUseCase.execute(token)

      return response.status(StatusCodes.OK).json(refresh_token)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}
