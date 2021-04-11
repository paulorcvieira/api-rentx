import { ICreatePermissionDTO } from './ICreatePermissionDTO'

export interface ICreateRoleDTO {
  name: string
  description: string
  permissions: ICreatePermissionDTO[]
}
