import { Router } from 'express'

import {
  SendForgotPasswordMailController,
  ResetPasswordUserController,
} from '../../../useCases'

const passwordRouter = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()

passwordRouter.post('/forgot', sendForgotPasswordMailController.handle)

passwordRouter.post('/reset', resetPasswordUserController.handle)

export { passwordRouter }
