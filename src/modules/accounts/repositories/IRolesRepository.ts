import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO'
import { Role } from '../infra/typeorm/entities/Role'

interface IRolesRepository {
  create(data: ICreateRoleDTO): Promise<Role>
  findByName(name: string): Promise<Role | undefined>
  findById(data: ICreateRoleDTO[]): Promise<Role[]>
  list(): Promise<Role[]>
}

export { IRolesRepository }
