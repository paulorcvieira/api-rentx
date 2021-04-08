import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { DeleteCarImagesUseCase } from './DeleteCarImagesUseCase'

interface ICars {
  images_id: string[]
}

class DeleteCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { images_id } = request.body as ICars

      const deleteCarImagesUseCase = container.resolve(DeleteCarImagesUseCase)

      await deleteCarImagesUseCase.execute({
        images_id,
      })

      return response.status(StatusCodes.NO_CONTENT).json()
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}

export { DeleteCarImagesController }
