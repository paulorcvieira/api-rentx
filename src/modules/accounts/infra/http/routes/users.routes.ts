import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload-config'
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { is } from '@shared/infra/http/middlewares/ensurePermission'

import {
  CreateUserController,
  UpdateUserAvatarController,
} from '../../../useCases'

const usersRouter = Router()

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

const upload = multer(uploadConfig.upload('avatar'))

usersRouter.use(ensureAuthenticated)

usersRouter.get('/profile', profileUserController.handle)

usersRouter.post('/create', is(['ROLE_ADMIN']), createUserController.handle)

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  updateUserAvatarController.handle,
)

export { usersRouter }
