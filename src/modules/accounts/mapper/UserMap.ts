import { User } from '@modules/accounts/infra/typeorm/entities/User'

import { IUserResponseDTO } from '../dtos/IUserResponseDTO'

export class UserMap {
  static toDTO({
    id,
    name,
    username,
    email,
    driver_license,
    avatar,
  }: User): IUserResponseDTO {
    return {
      id,
      name,
      username,
      email,
      driver_license,
      avatar,
    }
  }
}
