import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

export class SendForgotPasswordMailController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body
      const ip_address = request.ip

      const sendForgotPasswordMailUseCase = container.resolve(
        SendForgotPasswordMailUseCase,
      )

      await sendForgotPasswordMailUseCase.execute({
        email,
        ip_address,
      })

      return response.status(StatusCodes.OK).json()
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}
