import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'

import { IUsersRepository } from '../IUsersRepository'

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, { ...data })
    this.users.push(user)
    return user
  }
  public async findById(user_id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === user_id)
  }

  public async findByIdWithRole(user_id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === user_id)
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username)
  }

  public async findByUsernameWithRole(
    username: string,
  ): Promise<User | undefined> {
    return this.users.find(user => user.username === username)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email)
  }

  public async findByEmailWithRole(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email)
  }

  public async list(): Promise<User[]> {
    return this.users
  }
}
