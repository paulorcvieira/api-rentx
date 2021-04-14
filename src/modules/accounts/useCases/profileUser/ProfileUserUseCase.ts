import { classToClass } from 'class-transformer'
import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import AppException from '@shared/exceptions/AppException'

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute(user_id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppException(
        'This user does not registered.',
        StatusCodes.NOT_FOUND,
      )
    }

    return classToClass(user)
  }
}
