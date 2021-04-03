import { Router } from 'express'

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { is } from '@shared/infra/http/middlewares/ensurePermission'

import {
  CreateSpecificationController,
  ListSpecificationsController,
} from '../../../useCases'

const specificationsRouter = Router()

const listSpecificationsController = new ListSpecificationsController()
const createSpecificationsController = new CreateSpecificationController()

specificationsRouter.use(ensureAuthenticated)

specificationsRouter.get(
  '/',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  listSpecificationsController.handle,
)

specificationsRouter.post(
  '/',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  createSpecificationsController.create,
)

export { specificationsRouter }
