import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { ListPermissionsUseCase } from './ListPermissionsUseCase'

class ListPermissionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listPermissionsUseCase = container.resolve(ListPermissionsUseCase)

      const permissions = await listPermissionsUseCase.execute()

      return response.status(StatusCodes.CREATED).json(permissions)
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}
export { ListPermissionsController }
