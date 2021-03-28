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
    id,
    avatar,
  }: IUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      driver_license,
      roles,
      id,
      avatar,
    })
    await this.repository.save(user)
    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id)
    return user
  }

  public async findByIdWithRole(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id, {
      relations: ['roles'],
    })
    return user
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { username } })
    return user
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
    const user = await this.repository.findOne({ where: { email } })
    return user
  }

  public async findByEmailWithRole(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['roles'],
    })
    return user
  }

  public async list(): Promise<User[]> {
    const users = await this.repository.find()
    return users
  }
}

export { UsersRepository }
