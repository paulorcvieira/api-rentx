import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { category_id, brand, name } = request.query

      const listAvailableCarsUseCase = container.resolve(
        ListAvailableCarsUseCase,
      )

      const cars = await listAvailableCarsUseCase.execute({
        category_id: category_id as string,
        brand: brand as string,
        name: name as string,
      })

      return response.status(StatusCodes.CREATED).json(cars)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}

export { ListAvailableCarsController }
