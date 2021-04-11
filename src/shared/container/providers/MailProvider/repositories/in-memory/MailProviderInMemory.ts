import { ISendMailDTO } from '../../dtos/ISendMailDTO'
import { IMailProvider } from '../IMailProvider'

export class MailProviderInMemory implements IMailProvider {
  private mail: ISendMailDTO[] = []

  public async sendMail(data: ISendMailDTO): Promise<void> {
    this.mail.push({ ...data })
  }
}
