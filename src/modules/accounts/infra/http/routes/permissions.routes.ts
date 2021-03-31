import { Router } from 'express'

import { is } from '@shared/infra/http/middlewares/ensurePermission'

import { CreatePermissionController } from '../../../useCases'

const permissionsRouter = Router()

const createPermissionController = new CreatePermissionController()

permissionsRouter.post(
  '/',
  is(['ROLE_ADMIN']),
  createPermissionController.handle,
)

export { permissionsRouter }
