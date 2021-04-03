import { Router } from 'express'

import {
  CreateCarController,
  ListAvailableCarsController,
} from '@modules/cars/useCases'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'

const carsRouter = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()

carsRouter.get('/available', listAvailableCarsController.handle)

carsRouter.post('/', ensureAuthenticated, createCarController.handle)

export { carsRouter }
