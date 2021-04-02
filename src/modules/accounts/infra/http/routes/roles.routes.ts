import { Router } from 'express'

import { is } from '@shared/infra/http/middlewares/ensurePermission'

import { CreateRoleController, ListRolesController } from '../../../useCases'

const rolesRouter = Router()

const createRoleController = new CreateRoleController()
const listRolesController = new ListRolesController()

rolesRouter.get('/', is(['ROLE_ADMIN']), listRolesController.handle)

rolesRouter.post('/', is(['ROLE_ADMIN']), createRoleController.handle)

export { rolesRouter }
