import { Request, Response } from 'express'

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'

class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const specifications = this.listSpecificationsUseCase.execute()

    return response.json(specifications)
  }
}

export { ListSpecificationsController }
