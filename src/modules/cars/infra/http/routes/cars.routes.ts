import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload-config'
import {
  CreateCarController,
  ListAvailableCarsController,
  CreateCarSpecificationController,
  UploadCarImagesController,
  DeleteCarImagesController,
} from '@modules/cars/useCases'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import { is } from '@shared/infra/http/middlewares/ensurePermission'

const carsRouter = Router()

const upload = multer(uploadConfig.upload('./tmp/categories'))

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()
const deleteCarImagesController = new DeleteCarImagesController()

carsRouter.get('/available', listAvailableCarsController.handle)

carsRouter.use(ensureAuthenticated)

carsRouter.post(
  '/specifications/:car_id',
  is(['ROLE_ADMIN']),
  createCarSpecificationController.handle,
)

carsRouter.post('/', is(['ROLE_ADMIN']), createCarController.handle)

carsRouter.post(
  '/images/:car_id',
  is(['ROLE_ADMIN']),
  upload.array('images'),
  uploadCarImagesController.handle,
)

carsRouter.delete(
  '/images',
  is(['ROLE_ADMIN']),
  deleteCarImagesController.handle,
)

export { carsRouter }
