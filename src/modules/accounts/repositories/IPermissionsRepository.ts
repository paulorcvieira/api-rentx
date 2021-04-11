import { ICreatePermissionDTO } from '../dtos/ICreatePermissionDTO'
import { Permission } from '../infra/typeorm/entities/Permission'

interface IPermissionsRepository {
  create(data: ICreatePermissionDTO): Promise<Permission>
  findByName(name: string): Promise<Permission | undefined>
  findById(permissions: ICreatePermissionDTO[]): Promise<Permission[]>
  list(): Promise<Permission[]>
}

export { IPermissionsRepository }
