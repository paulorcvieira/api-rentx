import fs from 'fs'
import handlebars from 'handlebars'

import { IParseMailTemplateDTO } from '../../dtos/IParseMailTemplateDTO'
import { IMailTemplateProvider } from '../IMailTemplateProvider'

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = fs.readFileSync(file).toString('utf-8')

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}
