import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'

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
    const usernameExists = await this.usersRepository.findByUsername(username)

    if (usernameExists) {
      throw new Error('Username already exists')
    }

    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new Error('Email already exists')
    }

    const existsRoles = await this.rolesRepository.findById(roles)

    if (!existsRoles) {
      throw new Error('Role not found')
    }

    const passwordHashed = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      username,
      password: passwordHashed,
      email,
      driver_license,
      roles: existsRoles,
    })

    delete user.password

    return user
  }
}

export { CreateUserUseCase }
