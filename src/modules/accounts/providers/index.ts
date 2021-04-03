import { container } from 'tsyringe'

import IHashProvider from './HashProvider/repositories/IHashProvider'
import BCryptHashProvider from './HashProvider/repositories/implementations/BCryptHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
