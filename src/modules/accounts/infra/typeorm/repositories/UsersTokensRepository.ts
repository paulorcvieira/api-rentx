import { getRepository, Repository } from 'typeorm'

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'

import { UserToken } from '../entities/UserToken'

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  public async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    })

    await this.repository.save(userToken)

    return userToken
  }

  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    const token = this.repository.findOne({ user_id, refresh_token })
    return token
  }

  public async deleteByTokenId(token_id: string): Promise<void> {
    await this.repository.delete(token_id)
  }
}
