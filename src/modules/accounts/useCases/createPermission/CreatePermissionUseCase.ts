import { StatusCodes } from 'http-status-codes'
import { injectable, inject } from 'tsyringe'

import { Permission } from '@modules/accounts/infra/typeorm/entities/Permission'
import AppException from '@shared/exceptions/AppException'

import { ICreatePermissionDTO } from '../../dtos/ICreatePermissionDTO'
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
  }: ICreatePermissionDTO): Promise<Permission> {
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
