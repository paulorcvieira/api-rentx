import { Router } from 'express'

import { is } from '../../../../accounts/infra/http/middlewares/ensurePermission'
import {
  CreateSpecificationController,
  ListSpecificationsController,
} from '../../../useCases'

const specificationsRouter = Router()

const listSpecificationsController = new ListSpecificationsController()
const createSpecificationsController = new CreateSpecificationController()

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
