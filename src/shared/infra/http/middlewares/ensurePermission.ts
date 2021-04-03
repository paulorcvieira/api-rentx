import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { verify } from 'jsonwebtoken'
import { container } from 'tsyringe'

import { jwt } from '@config/auth-config'
import { GetUserUseCase } from '@modules/accounts/useCases/getUser/GetUserUseCase'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

function is(
  role: string[],
): (
  request: Request,
  response: Response,
  next: NextFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<void | Response<any, Record<string, any>>> {
  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction,
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

      const getUserUseCase = container.resolve(GetUserUseCase)

      const user = await getUserUseCase.execute(sub)

      const userRoles = user?.roles.map(role => role.name)

      const existsRoles = userRoles?.some(r => role.includes(r))

      if (existsRoles) {
        return next()
      }

      return response
        .status(StatusCodes.FORBIDDEN)
        .json({ error: 'Not authorized' })
    } catch (error) {
      throw new Error('Invalid JWT token')
    }
  }

  return roleAuthorized
}

export { is }
