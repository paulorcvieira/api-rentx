import { verify } from 'jsonwebtoken'

import { jwt } from '@config/auth-config'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'

import { ExpressMiddleware } from '../../../../@types/middleware'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

const ensureAuthenticated: ExpressMiddleware = async (
  request,
  response,
  next,
) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('JWT token is missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, jwt.secret, {
      algorithms: ['HS256'],
    }) as ITokenPayload

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(sub)

    if (!user) {
      throw new Error('User does not exists')
    }

    request.user = {
      id: sub,
    }

    return next()
  } catch (err) {
    throw new Error('Invalid JWT token')
  }
}

export default ensureAuthenticated
