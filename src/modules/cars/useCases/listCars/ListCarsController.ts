import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { ListCarsUseCase } from './ListCarsUseCase'

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCarsUseCase = container.resolve(ListCarsUseCase)

    const cars = await listCarsUseCase.execute()

    return response.status(StatusCodes.CREATED).json(cars)
  }
}

export { ListCarsController }
