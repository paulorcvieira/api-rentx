import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'

class ListSpecificationsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listSpecificationsUseCase = container.resolve(
        ListSpecificationsUseCase,
      )

      const specifications = await listSpecificationsUseCase.execute()

      return response.status(StatusCodes.OK).json(specifications)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}

export { ListSpecificationsController }
