import { StatusCodes } from 'http-status-codes'
import { injectable, inject } from 'tsyringe'

import { Role } from '@modules/accounts/infra/typeorm/entities/Role'
import AppException from '@shared/exceptions/AppException'

import { ICreateRoleDTO } from '../../dtos/ICreateRoleDTO'
import { IPermissionsRepository } from '../../repositories/IPermissionsRepository'
import { IRolesRepository } from '../../repositories/IRolesRepository'

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    name,
    description,
    permissions,
  }: ICreateRoleDTO): Promise<Role> {
    const permissionExists = await this.rolesRepository.findByName(name)

    if (permissionExists) {
      throw new AppException(
        'This role is already registered.',
        StatusCodes.UNAUTHORIZED,
      )
    }

    const existsPermissions = await this.permissionsRepository.findById(
      permissions,
    )

    if (!existsPermissions) {
      throw new AppException(
        'This permission not found.',
        StatusCodes.NOT_FOUND,
      )
    }

    const permissionCreated = await this.rolesRepository.create({
      name,
      description,
      permissions: existsPermissions,
    })

    return permissionCreated
  }
}

export { CreateRoleUseCase }
