import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { User } from '../entities/User'

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
  }: ICreateUserDTO): Promise<User> {
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

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(user_id)
    return user
  }

  public async findByIdWithRole(user_id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(user_id, {
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
