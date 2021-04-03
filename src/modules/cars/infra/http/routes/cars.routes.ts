import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import {
  CreateCarController,
  ListAvailableCarsController,
  CreateCarSpecificationController,
  UploadCarImagesController,
} from '@modules/cars/useCases'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { is } from '@shared/infra/http/middlewares/ensurePermission'

const carsRouter = Router()

const upload = multer(uploadConfig.upload('./tmp/categories'))

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

carsRouter.get('/available', listAvailableCarsController.handle)

carsRouter.use(ensureAuthenticated)

carsRouter.post(
  '/specifications/:car_id',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  createCarSpecificationController.handle,
)

carsRouter.post(
  '/',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  createCarController.handle,
)

carsRouter.post(
  '/images/:car_id',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  upload.array('images'),
  uploadCarImagesController.handle,
)

export { carsRouter }
