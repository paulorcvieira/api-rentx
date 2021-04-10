import { StatusCodes } from 'http-status-codes'
import { injectable, inject } from 'tsyringe'

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import IHashProvider from '@modules/accounts/providers/HashProvider/repositories/IHashProvider'
import ITokenProvider from '@modules/accounts/providers/TokenProvider/repositories/ITokenProvider'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/repositories/IDateProvider'
import AppException from '@shared/exceptions/AppException'

import { IAuthenticateDTO } from '../../dtos/IAuthenticateDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({
    emailOrUsername,
    password,
    ip_address,
  }: IAuthenticateDTO): Promise<IResponse> {
    let user: User | undefined

    const emailPattern = /\S+@\S+\.\S+/
    const isEmail = (email: string): boolean => emailPattern.test(email)

    if (isEmail(emailOrUsername)) {
      user = await this.usersRepository.findByEmailWithRole(emailOrUsername)
    } else {
      user = await this.usersRepository.findByUsernameWithRole(emailOrUsername)
    }

    if (!user) {
      throw new AppException(
        'Incorrect credentials, try again.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    if (!user.status) {
      throw new AppException(
        'No permission to authenticate.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new AppException(
        'Incorrect credentials, try again.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const roles = user.roles.map(role => role.name)

    const refresh_token = this.tokenProvider.generateRefreshToken(
      user.id,
      user.email,
      roles,
    )

    const dateNow = this.dateProvider.dateNow()
    const expiresRefreshTokenDays = this.tokenProvider.expiresRefreshTokenDays()

    const refreshTokenExpiresDate = this.dateProvider.addDay(
      dateNow,
      expiresRefreshTokenDays,
    )

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refreshTokenExpiresDate,
      ip_address,
    })

    const token = this.tokenProvider.generateToken(user.id, roles)

    return {
      user,
      token,
      refresh_token,
    }
  }
}

export { AuthenticateUserUseCase }
