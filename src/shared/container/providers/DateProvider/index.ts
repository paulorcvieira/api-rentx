import { container } from 'tsyringe'

import { IDateProvider } from './repositories/IDateProvider'
import { DayjsDateProvider } from './repositories/implementations/DayjsDateProvider'

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider)
