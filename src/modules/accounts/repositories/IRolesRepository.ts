import { IRoleDTO } from '../dtos/IRoleDTO'
import { Role } from '../entities/Role'

interface IRolesRepository {
  create(data: IRoleDTO): Promise<Role>
  findByName(name: string): Promise<Role | undefined>
  findById(data: IRoleDTO[]): Promise<Role[]>
  list(): Promise<Role[]>
}

export { IRolesRepository }
