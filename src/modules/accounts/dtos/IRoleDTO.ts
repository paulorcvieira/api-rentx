import { Permission } from '../entities/Permission'

interface IRoleDTO {
  name: string
  description: string
  permissions: Permission[]
}

export { IRoleDTO }
