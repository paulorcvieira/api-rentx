import { container } from 'tsyringe'

import '../../modules/accounts/providers'
import './providers'

import { PermissionsRepository } from '../../modules/accounts/repositories/implementations/PermissionsRepository'
import { RolesRepository } from '../../modules/accounts/repositories/implementations/RolesRepository'
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository'
import { IPermissionsRepository } from '../../modules/accounts/repositories/IPermissionsRepository'
import { IRolesRepository } from '../../modules/accounts/repositories/IRolesRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository'
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
)

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
)
