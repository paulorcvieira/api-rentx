import { Router } from 'express'

import { is } from '@shared/infra/http/middlewares/ensurePermission'

import { CreateRoleController } from '../../../useCases'

const rolesRouter = Router()

const createRoleController = new CreateRoleController()

rolesRouter.post('/', is(['ROLE_ADMIN']), createRoleController.handle)

export { rolesRouter }
