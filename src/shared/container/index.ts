import { container } from 'tsyringe'

import '@modules/accounts/providers'
import './providers'

import { PermissionsRepository } from '@modules/accounts/infra/typeorm/repositories/PermissionsRepository'
import { RolesRepository } from '@modules/accounts/infra/typeorm/repositories/RolesRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IPermissionsRepository } from '@modules/accounts/repositories/IPermissionsRepository'
import { IRolesRepository } from '@modules/accounts/repositories/IRolesRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'

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
