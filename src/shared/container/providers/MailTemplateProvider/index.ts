import { container } from 'tsyringe'

import { IMailTemplateProvider } from './repositories/IMailTemplateProvider'
import { MailTemplateProvider } from './repositories/implementations/HandlebarsMailTemplateProvider'

const providers = {
  handlebars: MailTemplateProvider,
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
)
