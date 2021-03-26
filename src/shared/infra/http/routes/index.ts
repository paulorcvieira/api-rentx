import { Router } from 'express'

import {
  categoriesRouter,
  specificationsRouter,
} from '../../../../modules/cars/infra/http/routes'

const routes = Router()

// routes.post("/users", usersRouter)
// routes.post("/sessions", sessionsRouter)
// routes.post("/permissions", permissionsRouter)
// routes.post("/roles", rolesRouter)

routes.use('/categories', categoriesRouter)
routes.use('/specifications', specificationsRouter)

export { routes }
