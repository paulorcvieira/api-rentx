import { IUserDTO } from '../dtos/IUserDTO'
import { User } from '../entities/User'

interface IUsersRepository {
  create(data: IUserDTO): Promise<User>
  findById(id: string): Promise<User | undefined>
  findByIdWithRole(id: string): Promise<User | undefined>
  findByUsername(username: string): Promise<User | undefined>
  findByUsernameWithRole(username: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  findByEmailWithRole(email: string): Promise<User | undefined>
  list(): Promise<User[]>
}

export { IUsersRepository }
