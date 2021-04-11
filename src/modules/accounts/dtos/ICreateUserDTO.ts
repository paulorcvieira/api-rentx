import { ICreateRoleDTO } from './ICreateRoleDTO'

export interface ICreateUserDTO {
  name: string
  username: string
  password: string
  email: string
  driver_license: string
  roles: ICreateRoleDTO[]
  id?: string
  avatar?: string
}
