import { Router } from 'express'

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { is } from '@shared/infra/http/middlewares/ensurePermission'

import { CreateRoleController, ListRolesController } from '../../../useCases'

const rolesRouter = Router()

const createRoleController = new CreateRoleController()
const listRolesController = new ListRolesController()

rolesRouter.use(ensureAuthenticated)

rolesRouter.get('/', is(['ROLE_ADMIN']), listRolesController.handle)

rolesRouter.post('/', is(['ROLE_ADMIN']), createRoleController.handle)

export { rolesRouter }
