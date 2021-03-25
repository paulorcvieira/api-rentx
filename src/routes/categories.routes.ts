import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../modules/cars/useCases/createCategory'
import { ImportCategoriesController } from '../modules/cars/useCases/importCategory'
import { ListCategoriesController } from '../modules/cars/useCases/listCategories'

const categoriesRouter = Router()

const upload = multer({
  dest: './tmp',
})

const listCategoriesController = new ListCategoriesController()
const createCategoriesController = new CreateCategoryController()
const importCategoriesController = new ImportCategoriesController()

categoriesRouter.get('/', (request, response) =>
  listCategoriesController.handle(request, response),
)

categoriesRouter.post('/', (request, response) =>
  createCategoriesController.handle(request, response),
)

categoriesRouter.post('/import', upload.single('file'), (request, response) =>
  importCategoriesController.handle(request, response),
)

export { categoriesRouter }
