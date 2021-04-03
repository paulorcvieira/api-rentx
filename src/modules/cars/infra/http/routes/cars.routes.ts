import { Router } from 'express'

import {
  CreateCarController,
  ListAvailableCarsController,
} from '@modules/cars/useCases'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { is } from '@shared/infra/http/middlewares/ensurePermission'

const carsRouter = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRouter.get('/available', listAvailableCarsController.handle)

carsRouter.use(ensureAuthenticated)

carsRouter.post(
  '/specifications/:car_id',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  createCarSpecificationController.handle,
)

carsRouter.post('/', createCarController.handle)

export { carsRouter }
