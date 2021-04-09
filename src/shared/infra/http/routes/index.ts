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
import { rentalRouter } from '@modules/rentals/infra/http/routes'

const routes = Router()

routes.use('/accounts', authenticateRouter)

routes.use('/users', usersRouter)
routes.use('/permissions', permissionsRouter)
routes.use('/roles', rolesRouter)

routes.use('/categories', categoriesRouter)
routes.use('/specifications', specificationsRouter)

routes.use('/cars', carsRouter)

routes.use('/rentals', rentalRouter)

export { routes }
