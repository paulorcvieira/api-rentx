import { Router } from 'express'

import {
  CreateSpecificationController,
  ListSpecificationsController,
} from '../modules/cars/useCases'

const specificationsRouter = Router()

const listSpecificationsController = new ListSpecificationsController()
const createSpecificationsController = new CreateSpecificationController()

specificationsRouter.get('/', listSpecificationsController.handle)

specificationsRouter.post('/', createSpecificationsController.create)

export { specificationsRouter }
