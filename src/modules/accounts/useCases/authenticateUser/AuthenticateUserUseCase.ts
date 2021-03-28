import { compare } from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import { jwt } from '../../../../config/auth-config'
import AppException from '../../../../shared/exceptions/AppException'
import { IAuthenticateDTO } from '../../dtos/IAuthenticateDTO'
import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  private isEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  public async execute({
    emailOrUsername,
    password,
  }: IAuthenticateDTO): Promise<IResponse> {
    let user: User | undefined

    if (this.isEmail(emailOrUsername)) {
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

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppException(
        'Incorrect credentials, try again.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const roles = user.roles.map(role => role.name)

    const token = AuthenticateUserUseCase.generateToken(user.id, roles)

    return {
      token,
      user,
    }
  }

  static generateToken(id: string, roles: string[]): string {
    const token = sign({ roles }, jwt.secret, {
      subject: id,
      expiresIn: jwt.expiresIn,
    })

    return token
  }
}

export { AuthenticateUserUseCase }
