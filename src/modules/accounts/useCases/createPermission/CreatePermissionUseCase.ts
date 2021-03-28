import { StatusCodes } from 'http-status-codes'
import { injectable, inject } from 'tsyringe'

import AppException from '../../../../shared/exceptions/AppException'
import { IPermissionDTO } from '../../dtos/IPermissionDTO'
import { Permission } from '../../entities/Permission'
import { IPermissionsRepository } from '../../repositories/IPermissionsRepository'

@injectable()
class CreatePermissionUseCase {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    name,
    description,
  }: IPermissionDTO): Promise<Permission> {
    const permissionExists = await this.permissionsRepository.findByName(name)

    if (permissionExists) {
      throw new AppException(
        'This permission is already registered.',
        StatusCodes.CONFLICT,
      )
    }

    const permission = await this.permissionsRepository.create({
      name,
      description,
    })

    return permission
  }
}

export { CreatePermissionUseCase }
