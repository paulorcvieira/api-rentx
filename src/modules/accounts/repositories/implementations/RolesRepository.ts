import { getRepository, Repository } from 'typeorm'

import { IRoleDTO } from '../../dtos/IRoleDTO'
import { Role } from '../../entities/Role'
import { IRolesRepository } from '../IRolesRepository'

class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>

  constructor() {
    this.repository = getRepository(Role)
  }

  public async create({
    name,
    description,
    permissions,
  }: IRoleDTO): Promise<Role> {
    const role = this.repository.create({ name, description, permissions })
    await this.repository.save(role)
    return role
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.repository.findOne({ where: { name } })
    return role
  }

  public async findById(roles: IRoleDTO[]): Promise<Role[]> {
    const role = await this.repository.findByIds(roles)
    return role
  }

  public async list(): Promise<Role[]> {
    const roles = await this.repository.find()
    return roles
  }
}

export { RolesRepository }
