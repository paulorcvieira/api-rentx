import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

import uploadConfig from '@config/upload-config'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/repositories/IStorageProvider'
import AppException from '@shared/exceptions/AppException'

import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequestDTO {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppException(
        'User is not registered.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const folder = uploadConfig.folder('avatar')

    if (user.avatar) {
      await this.storageProvider.deleteFile(folder, user.avatar)
    }

    const filename = await this.storageProvider.saveFile(folder, avatarFilename)

    Object.assign(user, { avatar: filename })

    await this.usersRepository.create(user)

    return user
  }
}

export { UpdateUserAvatarUseCase }
