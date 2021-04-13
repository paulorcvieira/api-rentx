import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
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
      const user_id = request.user.id

      const usersRepository = new UsersRepository()

      const user = await usersRepository.findByIdWithRole(user_id)

      if (!user) {
        throw new AppException(
          'This user does not registered, try again.',
          StatusCodes.UNAUTHORIZED,
        )
      }

      const userRoles = user.roles.map(role => role.name)

      const existsRoles = userRoles.some(r => role.includes(r))

      if (!existsRoles) {
        return response
          .status(StatusCodes.FORBIDDEN)
          .json({ error: 'This user has no access rules, try later.' })
      }

      return next()
    } catch (error) {
      throw new AppException(
        'This JWT token is invalid, try again.',
        StatusCodes.UNAUTHORIZED,
      )
    }
  }

  return roleAuthorized
}
