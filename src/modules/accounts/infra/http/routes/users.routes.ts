import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { is } from '@shared/infra/http/middlewares/ensurePermission'

import {
  CreateUserController,
  UpdateUserAvatarController,
} from '../../../useCases'

const usersRouter = Router()

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

const upload = multer(uploadConfig.upload('./tmp/avatar'))

usersRouter.post('/', is(['ROLE_ADMIN']), createUserController.handle)

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  updateUserAvatarController.handle,
)

export { usersRouter }
