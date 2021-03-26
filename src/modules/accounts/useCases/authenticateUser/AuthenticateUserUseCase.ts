import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import { IAuthenticateDTO } from '../../dtos/IAuthenticateDTO'
import { Permission } from '../../entities/Permission'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    username,
    password,
  }: IAuthenticateDTO): Promise<Permission> {
    const user = await this.usersRepository.findByUsernameWithRole(username)

    if (!user) {
      throw new Error('User not found')
    }

    const matchPassword = await compare(password, user.password)

    if (!matchPassword) {
      throw new Error('Incorrect password or username')
    }

    const roles = user.roles.map(role => role.name)

    const token = sign({ roles }, '93eea6a2c12628b3a3b7618f6882c912', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      token,
      user,
    }
  }
}

export { AuthenticateUserUseCase }
