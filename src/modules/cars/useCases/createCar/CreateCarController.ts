import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { CreateCarUseCase } from './CreateCarUseCase'

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      } = request.body

      const createCarUseCase = container.resolve(CreateCarUseCase)

      const car = await createCarUseCase.execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      })

      return response.status(StatusCodes.CREATED).json(car)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}

export { CreateCarController }
