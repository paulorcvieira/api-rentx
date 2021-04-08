import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

class CreateCarSpecificationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { car_id } = request.params
      const { specifications_id } = request.body

      const createCarSpecificationUseCase = container.resolve(
        CreateCarSpecificationUseCase,
      )

      const car = await createCarSpecificationUseCase.execute({
        car_id: car_id as string,
        specifications_id: specifications_id as string[],
      })

      return response.status(StatusCodes.CREATED).json(car)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}

export { CreateCarSpecificationController }
