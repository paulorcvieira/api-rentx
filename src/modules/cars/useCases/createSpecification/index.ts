import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export default (): CreateSpecificationController => {
  const specificationRepository = new SpecificationsRepository()

  const createSpecificationsUseCase = new CreateSpecificationUseCase(
    specificationRepository,
  )

  const createSpecificationsController = new CreateSpecificationController(
    createSpecificationsUseCase,
  )

  return createSpecificationsController
}
