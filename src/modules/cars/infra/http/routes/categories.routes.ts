import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../../../../../config/upload'
import { is } from '../../../../accounts/infra/http/middlewares/ensurePermission'
import {
  CreateCategoryController,
  ImportCategoriesController,
  ListCategoriesController,
} from '../../../useCases'

const categoriesRouter = Router()

const upload = multer(uploadConfig.upload('./tmp/categories'))

const listCategoriesController = new ListCategoriesController()
const createCategoriesController = new CreateCategoryController()
const importCategoriesController = new ImportCategoriesController()

categoriesRouter.get(
  '/',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  listCategoriesController.handle,
)

categoriesRouter.post(
  '/',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  createCategoriesController.handle,
)

categoriesRouter.post(
  '/import',
  upload.single('file'),
  is(['ROLE_ADMIN', 'ROLE_USER']),
  importCategoriesController.handle,
)

export { categoriesRouter }
