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
  carsRouter,
} from '@modules/cars/infra/http/routes'

const routes = Router()

routes.use('/sessions', authenticateRouter)

routes.use('/users', usersRouter)
routes.use('/permissions', permissionsRouter)
routes.use('/roles', rolesRouter)

routes.use('/categories', categoriesRouter)
routes.use('/specifications', specificationsRouter)

routes.use('/cars', carsRouter)

export { routes }
