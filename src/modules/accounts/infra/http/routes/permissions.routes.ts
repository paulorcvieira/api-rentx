import { Router } from 'express'

import { CreatePermissionController } from '../../../useCases'
import { is } from '../middlewares/ensurePermission'

const permissionsRouter = Router()

const createPermissionController = new CreatePermissionController()

permissionsRouter.post(
  '/',
  is(['ROLE_ADMIN']),
  createPermissionController.handle,
)

export { permissionsRouter }
