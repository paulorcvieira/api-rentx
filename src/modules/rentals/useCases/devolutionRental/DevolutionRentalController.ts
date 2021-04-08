import { Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase'

export class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user
      const { rental_id } = request.params

      const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

      const rental = await devolutionRentalUseCase.execute({
        rental_id,
        user_id,
      })

      return response.status(StatusCodes.OK).json(rental)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}
