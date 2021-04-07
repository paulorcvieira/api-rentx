import { Router } from 'express'

import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { is } from '@shared/infra/http/middlewares/ensurePermission'

import { CreateRentalController } from '../../../useCases'

const rentalRouter = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserUseCase = new ListRentalsByUserController()

rentalRouter.use(ensureAuthenticated)

rentalRouter.get(
  '/user',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  listRentalsByUserUseCase.handle,
)

rentalRouter.post(
  '/',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  createRentalController.handle,
)

rentalRouter.post(
  '/devolution/:rental_id',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  devolutionRentalController.handle,
)

export { rentalRouter }
