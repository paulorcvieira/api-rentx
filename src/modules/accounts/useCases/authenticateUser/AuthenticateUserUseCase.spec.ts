import BCryptHashProvider from '@modules/accounts/providers/HashProvider/repositories/implementations/BCryptHashProvider'
import { JwtTokenProvider } from '@modules/accounts/providers/TokenProvider/repositories/implementations/JwtTokenProvider'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/repositories/implementations/DayjsDateProvider'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let hashProvider: BCryptHashProvider
let tokenProvider: JwtTokenProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let authenticateUserUseCase: AuthenticateUserUseCase
let password_hash: string

describe('Authenticate User', () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    hashProvider = new BCryptHashProvider()
    tokenProvider = new JwtTokenProvider()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      hashProvider,
      tokenProvider,
      usersTokensRepositoryInMemory,
      dateProvider,
    )
    password_hash = await hashProvider.generateHash('valid_password')
  })

  it('should be able to authenticate an user', async () => {
    await usersRepositoryInMemory.create({
      driver_license: 'valid_licence_driver',
      email: 'valid_email@test.com',
      name: 'valid_name',
      password: password_hash,
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

    const session = await authenticateUserUseCase.execute({
      emailOrUsername: 'valid_email@test.com',
      password: 'valid_password',
      ip_address: 'valid_ip',
    })

    expect(session).toHaveProperty('refresh_token')
  })
})
