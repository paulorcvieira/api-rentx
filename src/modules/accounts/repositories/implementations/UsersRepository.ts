import { getRepository, Repository } from 'typeorm'

import { IUserDTO } from '../../dtos/IUserDTO'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  public async create({
    name,
    username,
    password,
    email,
    driver_license,
    roles,
  }: IUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      driver_license,
      roles,
    })
    await this.repository.save(user)
    return user
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const role = await this.repository.findOne({ where: { username } })
    return role
  }

  public async findByUsernameWithRole(
    username: string,
  ): Promise<User | undefined> {
    const role = await this.repository.findOne({
      where: { username },
      relations: ['roles'],
    })
    return role
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const role = await this.repository.findOne({ where: { email } })
    return role
  }

  public async list(): Promise<User[]> {
    const roles = await this.repository.find()
    return roles
  }
}

export { UsersRepository }
