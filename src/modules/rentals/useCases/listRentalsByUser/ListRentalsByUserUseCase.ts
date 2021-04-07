import { inject, injectable } from 'tsyringe'

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

interface IRequest {
  user_id: string
}

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUserId(user_id)
    return rentalsByUser
  }
}
