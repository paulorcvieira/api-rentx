import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase'

interface IFiles {
  filename: string
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { car_id } = request.params
      const images = request.files as IFiles[]

      const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

      const images_name = images.map(file => file.filename)

      await uploadCarImagesUseCase.execute({ car_id, images_name })

      return response.status(StatusCodes.CREATED).json()
    } catch (error) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.message })
    }
  }
}

export { UploadCarImagesController }
