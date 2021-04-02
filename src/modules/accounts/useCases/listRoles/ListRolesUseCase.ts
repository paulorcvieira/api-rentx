import { injectable, inject } from 'tsyringe'

import { Role } from '@modules/accounts/infra/typeorm/entities/Role'

import { IRolesRepository } from '../../repositories/IRolesRepository'

@injectable()
class ListRolesUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(): Promise<Role[]> {
    const roles = await this.rolesRepository.list()
    return roles
  }
}

export { ListRolesUseCase }
