import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

import ITokenProvider from '@modules/accounts/providers/TokenProvider/repositories/ITokenProvider'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/repositories/IDateProvider'
import AppException from '@shared/exceptions/AppException'

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute(refresh_token: string): Promise<string> {
    const { sub: user_id, email } = this.tokenProvider.verifyIsValidToken(
      refresh_token,
    )

    const token = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      refresh_token,
    )

    if (!token) {
      throw new AppException(
        'This refresh token does not registered.',
        StatusCodes.NOT_FOUND,
      )
    }

    await this.usersTokensRepository.deleteByTokenId(token.id)

    const user = await this.usersRepository.findByIdWithRole(user_id)

    if (!user) {
      throw new AppException(
        'Incorrect credentials, try again.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const roles = user.roles.map(role => role.name)

    const refreshToken = this.tokenProvider.generateRefreshToken(
      user_id,
      email,
      roles,
    )

    const dateNow = this.dateProvider.dateNow()
    const expiresRefreshTokenDays = this.tokenProvider.expiresRefreshTokenDays()

    const refreshTokenExpiresDate = this.dateProvider.addDay(
      dateNow,
      expiresRefreshTokenDays,
    )

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: refreshToken,
      expires_date: refreshTokenExpiresDate,
    })

    return refreshToken
  }
}
