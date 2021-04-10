import { StatusCodes } from 'http-status-codes'
import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'

import ITokenProvider from '@modules/accounts/providers/TokenProvider/repositories/ITokenProvider'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/repositories/IDateProvider'
import { IMailProvider } from '@shared/container/providers/MailProvider/repositories/IMailProvider'
import AppException from '@shared/exceptions/AppException'

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmailWithRole(email)

    if (!user) {
      throw new AppException(
        'This user does not registered.',
        StatusCodes.NOT_FOUND,
      )
    }

    const roles = user.roles.map(role => role.name)

    const refresh_token = this.tokenProvider.generateRefreshToken(
      user.id,
      user.email,
      roles,
    )

    const dateNow = this.dateProvider.dateNow()

    const expires_date = this.dateProvider.addHours(dateNow, 2)

    await this.usersTokensRepository.create({
      refresh_token,
      expires_date,
      user_id: user.id,
    })

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgot_password.hbs',
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[RentX] - Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/password/reset?token=${refresh_token}`,
        },
      },
    })
  }
}
