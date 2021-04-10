import { container } from 'tsyringe'

import { IMailTemplateProvider } from './repositories/IMailTemplateProvider'
import { HandlebarsMailTemplateProvider } from './repositories/implementations/HandlebarsMailTemplateProvider'

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
)
