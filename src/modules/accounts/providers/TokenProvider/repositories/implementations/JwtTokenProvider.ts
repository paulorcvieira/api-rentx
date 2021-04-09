import { sign } from 'jsonwebtoken'

import { jwt } from '@config/auth-config'

import ITokenProvider from '../ITokenProvider'

class JwtTokenProvider implements ITokenProvider {
  public generateToken(id: string, roles: string[]): string {
    const token = sign({ roles }, jwt.secret_token, {
      subject: id,
      expiresIn: jwt.expires_in_token,
    })

    return token
  }

  public generateRefreshToken(
    id: string,
    email: string,
    roles: string[],
  ): string {
    const token = sign({ email, roles }, jwt.secret_refresh_token, {
      subject: id,
      expiresIn: jwt.expires_in_refresh_token,
    })

    return token
  }

  public expiresRefreshTokenDays(): number {
    return jwt.expires_refresh_token_days
  }
}

export default JwtTokenProvider
