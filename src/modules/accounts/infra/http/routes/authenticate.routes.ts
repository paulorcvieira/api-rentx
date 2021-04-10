import { Router } from 'express'

import {
  AuthenticateUserController,
  RefreshTokenController,
} from '../../../useCases'

const authenticateRouter = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authenticateRouter.post('/sessions', authenticateUserController.handle)

authenticateRouter.post('/refresh-token', refreshTokenController.handle)

export { authenticateRouter }
