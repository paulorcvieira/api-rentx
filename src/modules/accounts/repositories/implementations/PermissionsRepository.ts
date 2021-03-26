import { getRepository, Repository } from 'typeorm'

import { IPermissionDTO } from '../../dtos/IPermissionDTO'
import { Permission } from '../../entities/Permission'
import { IPermissionsRepository } from '../IPermissionsRepository'

class PermissionsRepository implements IPermissionsRepository {
  private repository: Repository<Permission>

  constructor() {
    this.repository = getRepository(Permission)
  }

  public async create({
    name,
    description,
  }: IPermissionDTO): Promise<Permission> {
    const permission = this.repository.create({ name, description })
    await this.repository.save(permission)
    return permission
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    const permission = await this.repository.findOne({ where: { name } })
    return permission
  }

  public async findById(permissions: IPermissionDTO[]): Promise<Permission[]> {
    const role = await this.repository.findByIds(permissions)
    return role
  }

  public async list(): Promise<Permission[]> {
    const permissions = await this.repository.find()
    return permissions
  }
}

export { PermissionsRepository }
