import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken'

import { IUsersTokensRepository } from '../IUsersTokensRepository'

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserToken[] = []

  public async create({
    user_id,
    refresh_token,
    expires_date,
    ip_address,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()
    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
      ip_address,
    })
    this.usersTokens.push(userToken)
    return userToken
  }

  public async findByUserId(user_id: string): Promise<UserToken | undefined> {
    return this.usersTokens.find(user => user.id === user_id)
  }

  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    return this.usersTokens.find(
      token =>
        token.user_id === user_id && token.refresh_token === refresh_token,
    )
  }

  public async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    return this.usersTokens.find(token => token.refresh_token === refresh_token)
  }

  public async deleteByTokenId(token_id: string): Promise<void> {
    const userToken = this.usersTokens.find(
      ut => ut.id === token_id,
    ) as UserToken
    this.usersTokens.splice(this.usersTokens.indexOf(userToken))
  }
}
