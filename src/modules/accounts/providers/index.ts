import { container } from 'tsyringe'

import IHashProvider from './HashProvider/repositories/IHashProvider'
import BCryptHashProvider from './HashProvider/repositories/implementations/BCryptHashProvider'
import JwtTokenProvider from './TokenProvider/repositories/implementations/JwtTokenProvider'
import ITokenProvider from './TokenProvider/repositories/ITokenProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)

container.registerSingleton<ITokenProvider>('TokenProvider', JwtTokenProvider)
