import { Router } from 'express'

import { createSpecificationsController } from '../modules/cars/useCases/createSpecification'
import { listSpecificationsController } from '../modules/cars/useCases/listSpecifications'

const specificationsRouter = Router()

specificationsRouter.get('/', (request, response) =>
  listSpecificationsController.handle(request, response),
)

specificationsRouter.post('/', (request, response) =>
  createSpecificationsController.create(request, response),
)

export { specificationsRouter }
