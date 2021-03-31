import { Permission } from '../infra/typeorm/entities/Permission'

interface IRoleDTO {
  name: string
  description: string
  permissions: Permission[]
}

export { IRoleDTO }
