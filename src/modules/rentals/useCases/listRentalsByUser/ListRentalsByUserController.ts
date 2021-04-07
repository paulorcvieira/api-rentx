import { Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase'

export class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user

      const listRentalsByUserUseCase = container.resolve(
        ListRentalsByUserUseCase,
      )

      const rentals = await listRentalsByUserUseCase.execute({ user_id })

      return response.status(StatusCodes.OK).json(rentals)
    } catch (error) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message })
    }
  }
}
