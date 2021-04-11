import { StatusCodes } from 'http-status-codes'

import { JwtTokenProvider } from '@modules/accounts/providers/TokenProvider/repositories/implementations/JwtTokenProvider'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/repositories/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/repositories/in-memory/MailProviderInMemory'
import AppException from '@shared/exceptions/AppException'

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProviderInMemory: MailProviderInMemory
let tokenProvider: JwtTokenProvider

describe('Send Forgot Password', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    tokenProvider = new JwtTokenProvider()
    dateProvider = new DayjsDateProvider()
    mailProviderInMemory = new MailProviderInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      tokenProvider,
      dateProvider,
      mailProviderInMemory,
    )
  })

  it('should be able to send a forgot password mail to user.', async () => {
    const sendMail = spyOn(mailProviderInMemory, 'sendMail')

    await usersRepositoryInMemory.create({
      driver_license: 'valid_licence_driver',
      email: 'valid_email@test.com',
      name: 'valid_name',
      password: 'valid_password',
      username: 'valid_username',
      roles: [
        {
          name: 'valid_role_name',
          description: 'valid_role_description',
          permissions: [
            {
              name: 'valid_permission_name',
              description: 'valid_permission_description',
            },
          ],
        },
      ],
    })

    await sendForgotPasswordMailUseCase.execute({
      email: 'valid_email@test.com',
      ip_address: 'valid_ip',
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exists.', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute({
        email: 'invalid_email@test.com',
        ip_address: 'valid_ip',
      }),
    ).rejects.toEqual(
      new AppException('This user does not registered.', StatusCodes.NOT_FOUND),
    )
  })

  it('should be able to create an users token.', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create')

    await usersRepositoryInMemory.create({
      driver_license: 'valid_licence_driver',
      email: 'valid_email@test.com',
      name: 'valid_name',
      password: 'valid_password',
      username: 'valid_username',
      roles: [
        {
          name: 'valid_role_name',
          description: 'valid_role_description',
          permissions: [
            {
              name: 'valid_permission_name',
              description: 'valid_permission_description',
            },
          ],
        },
      ],
    })

    await sendForgotPasswordMailUseCase.execute({
      email: 'valid_email@test.com',
      ip_address: 'valid_ip',
    })

    expect(generateTokenMail).toHaveBeenCalled()
  })
})
