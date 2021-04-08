import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { CreateRentalUseCase } from './CreateRentalUseCase'

export class CreateRentalController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user
      const { car_id, expected_return_date } = request.body

      const createRentalUseCase = container.resolve(CreateRentalUseCase)

      const rental = await createRentalUseCase.execute({
        user_id,
        car_id,
        expected_return_date,
      })

      return response.status(StatusCodes.CREATED).json(rental)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}
