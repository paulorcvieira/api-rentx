import { Router } from 'express'

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { is } from '@shared/infra/http/middlewares/ensurePermission'

import {
  CreatePermissionController,
  ListPermissionsController,
} from '../../../useCases'

const permissionsRouter = Router()

const createPermissionController = new CreatePermissionController()
const listPermissionsController = new ListPermissionsController()

permissionsRouter.use(ensureAuthenticated)

permissionsRouter.get('/', is(['ROLE_ADMIN']), listPermissionsController.handle)

permissionsRouter.post(
  '/',
  is(['ROLE_ADMIN']),
  createPermissionController.handle,
)

export { permissionsRouter }
