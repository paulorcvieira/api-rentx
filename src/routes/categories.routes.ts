import { Router } from 'express'
import multer from 'multer'

import createCategoriesController from '../modules/cars/useCases/createCategory'
import importCategoriesController from '../modules/cars/useCases/importCategory'
import listCategoriesController from '../modules/cars/useCases/listCategories'

const categoriesRouter = Router()

const upload = multer({
  dest: './tmp',
})

categoriesRouter.get('/', (request, response) =>
  listCategoriesController().handle(request, response),
)

categoriesRouter.post('/', (request, response) =>
  createCategoriesController().handle(request, response),
)

categoriesRouter.post('/import', upload.single('file'), (request, response) =>
  importCategoriesController().handle(request, response),
)

export { categoriesRouter }
