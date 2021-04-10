import { Router } from 'express'

import { SendForgotPasswordMailController } from '../../../useCases'

const passwordRouter = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()

passwordRouter.post('/forgot', sendForgotPasswordMailController.handle)

export { passwordRouter }
