import { IUserDTO } from '../dtos/IUserDTO'
import { User } from '../entities/User'

interface IUsersRepository {
  create(data: IUserDTO): Promise<User>
  findByUsername(username: string): Promise<User | undefined>
  findByUsernameWithRole(username: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  list(): Promise<User[]>
}

export { IUsersRepository }
