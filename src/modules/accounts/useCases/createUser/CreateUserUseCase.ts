import { hash } from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import { injectable, inject } from 'tsyringe'

import AppException from '../../../../shared/exceptions/AppException'
import { IUserDTO } from '../../dtos/IUserDTO'
import { User } from '../../entities/User'
import { IRolesRepository } from '../../repositories/IRolesRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    name,
    username,
    password,
    email,
    driver_license,
    roles,
  }: IUserDTO): Promise<User> {
    if (password && password.length < 6) {
      throw new AppException(
        'Password must be at least 6 characters.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const usernameExists = await this.usersRepository.findByUsername(username)

    if (usernameExists) {
      throw new AppException(
        'This username is already registered.',
        StatusCodes.CONFLICT,
      )
    }

    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppException(
        'This email is already registered.',
        StatusCodes.CONFLICT,
      )
    }

    const existsRoles = await this.rolesRepository.findById(roles)

    if (!existsRoles) {
      throw new AppException('This role not found.', StatusCodes.NOT_FOUND)
    }

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      username,
      password: passwordHash,
      email,
      driver_license,
      roles: existsRoles,
    })

    return user
  }
}

export { CreateUserUseCase }
