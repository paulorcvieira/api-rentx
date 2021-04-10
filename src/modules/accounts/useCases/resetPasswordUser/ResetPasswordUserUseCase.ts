import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

import IHashProvider from '@modules/accounts/providers/HashProvider/repositories/IHashProvider'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/repositories/IDateProvider'
import AppException from '@shared/exceptions/AppException'

interface IRequest {
  token: string
  password: string
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppException('Invalid token.', StatusCodes.NOT_FOUND)
    }

    const dateNow = this.dateProvider.dateNow()

    const compareDate = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      dateNow,
    )

    if (compareDate) {
      throw new AppException('Expired token.', StatusCodes.BAD_REQUEST)
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppException(
        'This user does not registered.',
        StatusCodes.NOT_FOUND,
      )
    }

    const compare = await this.hashProvider.compareHash(password, user.password)

    if (compare) {
      throw new AppException(
        'The new password cannot be the same as the previous password.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const passwordHash = await this.hashProvider.generateHash(password)

    user.password = passwordHash

    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteByTokenId(userToken.id)
  }
}
