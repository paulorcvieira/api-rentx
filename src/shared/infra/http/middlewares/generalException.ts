import { StatusCodes } from 'http-status-codes'

import { ExpressErrorMiddleware } from '../../../../@types/middleware'
import AppException from '../../../exceptions/AppException'

const generalException: ExpressErrorMiddleware = (
  err,
  request,
  response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next,
) => {
  if (err instanceof AppException) {
    return response.status(err.status).json({
      status: err.status,
      message: err.message,
    })
  }

  console.error(err) // eslint-disable-line no-console

  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error.',
  })
}

export default generalException
