import { Permission } from '../entities/Permission'

interface IRoleDTO {
  name: string
  description: string
  permission: Permission[]
}

export { IRoleDTO }
