import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

const specificationRepository = SpecificationsRepository.getInstance()

const createSpecificationsUseCase = new CreateSpecificationUseCase(
  specificationRepository,
)

const createSpecificationsController = new CreateSpecificationController(
  createSpecificationsUseCase,
)

export { createSpecificationsController }
