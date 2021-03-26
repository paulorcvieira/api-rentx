import { IRoleDTO } from './IRoleDTO'

interface IUserDTO {
  name: string
  username: string
  password: string
  email: string
  driver_license: string
  roles: IRoleDTO[]
}

export { IUserDTO }
