import { IPermissionDTO } from '../dtos/IPermissionDTO'
import { Permission } from '../infra/typeorm/entities/Permission'

interface IPermissionsRepository {
  create(data: IPermissionDTO): Promise<Permission>
  findByName(name: string): Promise<Permission | undefined>
  findById(permissions: IPermissionDTO[]): Promise<Permission[]>
  list(): Promise<Permission[]>
}

export { IPermissionsRepository }
