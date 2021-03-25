import { Router } from 'express'

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification'
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications'

const specificationsRouter = Router()

const listSpecificationsController = new ListSpecificationsController()
const createSpecificationsController = new CreateSpecificationController()

specificationsRouter.get('/', (request, response) =>
  listSpecificationsController.handle(request, response),
)

specificationsRouter.post('/', (request, response) =>
  createSpecificationsController.create(request, response),
)

export { specificationsRouter }
