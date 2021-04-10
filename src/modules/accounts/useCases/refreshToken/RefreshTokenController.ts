import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { RefreshTokenUseCase } from './RefreshTokenUseCase'

export class RefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const refresh_token =
        request.body.token ||
        request.headers['x-access-token'] ||
        request.query.token

      const ip_address = request.ip

      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

      const refreshToken = await refreshTokenUseCase.execute({
        refresh_token,
        ip_address,
      })

      return response.status(StatusCodes.OK).json(refreshToken)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}
