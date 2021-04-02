import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { ListRolesUseCase } from './ListRolesUseCase'

class ListRolesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listRolesUseCase = container.resolve(ListRolesUseCase)

      const roles = await listRolesUseCase.execute()

      return response.status(StatusCodes.CREATED).json(roles)
    } catch (error) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message })
    }
  }
}
export { ListRolesController }
