import { StatusCodes } from 'http-status-codes'
import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'
import { v4 as uuidV4 } from 'uuid'

import ITokenProvider from '@modules/accounts/providers/TokenProvider/repositories/ITokenProvider'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/repositories/IDateProvider'
import { IMailProvider } from '@shared/container/providers/MailProvider/repositories/IMailProvider'
import AppException from '@shared/exceptions/AppException'

interface IRequest {
  email: string
  ip_address: string
}

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

  public async execute({ email, ip_address }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmailWithRole(email)

    if (!user) {
      throw new AppException(
        'This user does not registered.',
        StatusCodes.NOT_FOUND,
      )
    }

    const oldToken = await this.usersTokensRepository.findByUserId(user.id)

    if (oldToken) {
      await this.usersTokensRepository.deleteByTokenId(oldToken.id)
    }

    const refresh_token = uuidV4()

    const dateNow = this.dateProvider.dateNow()

    const expires_date = this.dateProvider.addHours(dateNow, 2)

    await this.usersTokensRepository.create({
      refresh_token,
      expires_date,
      user_id: user.id,
      ip_address,
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
          logo_link: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/files/images/oUAKMC5.png`,
          link: `${process.env.APP_WEB_HOST}/password/reset?token=${refresh_token}`,
        },
      },
    })
  }
}
