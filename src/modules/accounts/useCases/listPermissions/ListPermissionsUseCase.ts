import { injectable, inject } from 'tsyringe'

import { Permission } from '@modules/accounts/infra/typeorm/entities/Permission'

import { IPermissionsRepository } from '../../repositories/IPermissionsRepository'

@injectable()
class ListPermissionsUseCase {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(): Promise<Permission[]> {
    const permissions = await this.permissionsRepository.list()
    return permissions
  }
}

export { ListPermissionsUseCase }
