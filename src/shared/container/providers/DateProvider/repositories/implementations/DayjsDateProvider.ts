import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  public compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc, 'hours')
  }

  public compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc, 'days')
  }

  public convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  public dateNow(): Date {
    return dayjs().toDate()
  }

  public addHours(date: Date, hours: number): Date {
    return dayjs(date).add(hours, 'hours').toDate()
  }

  public addDay(date: Date, days: number): Date {
    return dayjs(date).add(days, 'days').toDate()
  }
}
