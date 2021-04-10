import { hash, compare } from 'bcrypt'

import IHashProvider from '../IHashProvider'

class BCryptHashProvider implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    const passwordHash = await hash(password, 8)
    return passwordHash
  }

  public async compareHash(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed)
  }
}

export default BCryptHashProvider
