import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { UserToken } from '../infra/typeorm/entities/UserToken'

export interface IUsersTokensRepository {
  create({
    user_id,
    refresh_token,
    expires_date,
    ip_address,
  }: ICreateUserTokenDTO): Promise<UserToken>
  findByUserId(user_id: string): Promise<UserToken | undefined>
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined>
  findByRefreshToken(refresh_token: string): Promise<UserToken | undefined>
  deleteByTokenId(token_id: string): Promise<void>
}
