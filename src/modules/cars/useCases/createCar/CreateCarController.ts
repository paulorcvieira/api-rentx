import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { CreateCarUseCase } from './CreateCarUseCase'

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
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
  }
}

export { CreateCarController }
