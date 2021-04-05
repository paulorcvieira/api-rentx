import { Router } from 'express'

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { is } from '@shared/infra/http/middlewares/ensurePermission'

import { CreateRentalController } from '../../../useCases'

const rentalRouter = Router()

const createRentalController = new CreateRentalController()

rentalRouter.use(ensureAuthenticated)

rentalRouter.post(
  '/',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  createRentalController.handle,
)

export { rentalRouter }
