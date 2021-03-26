import { injectable, inject } from 'tsyringe'

import { IRoleDTO } from '../../dtos/IRoleDTO'
import { Role } from '../../entities/Role'
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
    permission,
  }: IRoleDTO): Promise<Role> {
    const permissionExists = await this.rolesRepository.findByName(name)

    if (permissionExists) {
      throw new Error('Role already exists')
    }

    const existsPermissions = await this.permissionsRepository.findById(
      permission,
    )

    if (!existsPermissions) {
      throw new Error('Permission not found')
    }

    const permissionCreated = await this.rolesRepository.create({
      name,
      description,
      permission: existsPermissions,
    })

    return permissionCreated
  }
}

export { CreateRoleUseCase }
