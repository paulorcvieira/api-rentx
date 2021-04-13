import { StatusCodes } from 'http-status-codes'

import { JwtTokenProvider } from '@modules/accounts/providers/TokenProvider/repositories/implementations/JwtTokenProvider'
import AppException from '@shared/exceptions/AppException'

import { ExpressMiddleware } from '../../../../@types/middleware'

const ensureAuthenticated: ExpressMiddleware = async (
  request,
  _response,
  next,
) => {
  try {
    const authHeader = request.headers.authorization
    const jwtTokenProvider = new JwtTokenProvider()

    if (!authHeader) {
      throw new AppException(
        'JWT token is missing, try again.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const [, token] = authHeader.split(' ')

    const { sub: user_id } = jwtTokenProvider.verifyIsValidToken(
      token,
      'default',
    )

    request.user = {
      id: user_id,
    }

    return next()
  } catch (err) {
    throw new AppException(
      'This JWT token is invalid, try again.',
      StatusCodes.UNAUTHORIZED,
    )
  }
}

export default ensureAuthenticated
