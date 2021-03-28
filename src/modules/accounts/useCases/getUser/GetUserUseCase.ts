import { StatusCodes } from 'http-status-codes'
import { injectable, inject } from 'tsyringe'

import AppException from '../../../../shared/exceptions/AppException'
import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class GetUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findByIdWithRole(id)

    if (!user) {
      throw new AppException('User is not registered.', StatusCodes.NOT_FOUND)
    }

    return user
  }
}

export { GetUserUseCase }
