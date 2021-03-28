import { Router } from 'express'

import { CreateRoleController } from '../../../useCases'
import { is } from '../middlewares/ensurePermission'

const rolesRouter = Router()

const createRoleController = new CreateRoleController()

rolesRouter.post('/', is(['ROLE_ADMIN']), createRoleController.handle)

export { rolesRouter }
