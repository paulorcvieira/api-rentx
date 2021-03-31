import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

import { GetUserUseCase } from '@modules/accounts/useCases/getUser/GetUserUseCase'

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
    const { id } = request.user

    try {
      const getUserUseCase = container.resolve(GetUserUseCase)

      const user = await getUserUseCase.execute(id)

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
