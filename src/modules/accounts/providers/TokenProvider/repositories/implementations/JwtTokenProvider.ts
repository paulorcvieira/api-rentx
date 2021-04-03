import { sign } from 'jsonwebtoken'

import { jwt } from '@config/auth-config'

import ITokenProvider from '../ITokenProvider'

class JwtTokenProvider implements ITokenProvider {
  public generateToken(id: string, roles: string[]): string {
    const token = sign({ roles }, jwt.secret, {
      subject: id,
      expiresIn: jwt.expiresIn,
    })

    return token
  }
}

export default JwtTokenProvider
