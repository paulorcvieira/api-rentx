import { Router } from 'express'

import { CreateCarController, ListCarsController } from '@modules/cars/useCases'

const carsRouter = Router()

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()

carsRouter.get('/', listCarsController.handle)

carsRouter.post('/', createCarController.handle)

export { carsRouter }
