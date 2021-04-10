import { container } from 'tsyringe'

import mailConfig from '@config/mail-config'

import { IMailProvider } from './repositories/IMailProvider'
import { EtherealMailProvider } from './repositories/implementations/EtherealMailProvider'
import SESMailProvider from './repositories/implementations/SESMailProvider'

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
)
