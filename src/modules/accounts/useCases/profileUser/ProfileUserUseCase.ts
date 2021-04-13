import { inject, injectable } from 'tsyringe'

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute(user_id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id)
    return user
  }
}
