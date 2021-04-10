import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { JwtTokenProvider } from '@modules/accounts/providers/TokenProvider/repositories/implementations/JwtTokenProvider'
import AppException from '@shared/exceptions/AppException'

export function is(
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
    try {
      const authHeader = request.headers.authorization

      if (!authHeader) {
        throw new AppException(
          'JWT token is missing, try again.',
          StatusCodes.UNAUTHORIZED,
        )
      }

      const [, token] = authHeader.split(' ')

      const jwtTokenProvider = new JwtTokenProvider()

      const { sub: user_id } = jwtTokenProvider.verifyIsValidToken(
        token,
        'default',
      )

      const usersRepository = new UsersRepository()

      const user = await usersRepository.findByIdWithRole(user_id)

      const userRoles = user?.roles.map(role => role.name)

      const existsRoles = userRoles?.some(r => role.includes(r))

      if (existsRoles) {
        return next()
      }

      return response
        .status(StatusCodes.FORBIDDEN)
        .json({ error: 'Unauthorized.' })
    } catch (error) {
      throw new AppException(
        'This JWT token is invalid, try again.',
        StatusCodes.UNAUTHORIZED,
      )
    }
  }

  return roleAuthorized
}
