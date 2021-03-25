import { Router } from 'express'
import multer from 'multer'

import {
  CreateCategoryController,
  ImportCategoriesController,
  ListCategoriesController,
} from '../modules/cars/useCases'

const categoriesRouter = Router()

const upload = multer({
  dest: './tmp',
})

const listCategoriesController = new ListCategoriesController()
const createCategoriesController = new CreateCategoryController()
const importCategoriesController = new ImportCategoriesController()

categoriesRouter.get('/', listCategoriesController.handle)

categoriesRouter.post('/', createCategoriesController.handle)

categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle,
)

export { categoriesRouter }
