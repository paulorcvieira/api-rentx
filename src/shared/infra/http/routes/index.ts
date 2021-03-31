import { Router } from 'express'

import {
  usersRouter,
  authenticateRouter,
  rolesRouter,
  permissionsRouter,
} from '@modules/accounts/infra/http/routes'
import {
  categoriesRouter,
  specificationsRouter,
} from '@modules/cars/infra/http/routes'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const routes = Router()

routes.use('/sessions', authenticateRouter)

routes.use(ensureAuthenticated)

routes.use('/users', usersRouter)
routes.use('/permissions', permissionsRouter)
routes.use('/roles', rolesRouter)

routes.use('/categories', categoriesRouter)
routes.use('/specifications', specificationsRouter)

export { routes }
