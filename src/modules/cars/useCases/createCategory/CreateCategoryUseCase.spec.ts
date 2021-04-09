import { StatusCodes } from 'http-status-codes'

import AppException from '@shared/exceptions/AppException'

import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
  })

  test('should be able to create a new category', async () => {
    const category = {
      name: 'Category name test',
      description: 'Category description test',
    }

    await createCategoryUseCase.execute(category)

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    )

    expect(categoryCreated).toHaveProperty('id')
  })

  test('should not be able to create a new category with name exists', async () => {
    const category = {
      name: 'Category name test',
      description: 'Category description test',
    }

    await createCategoryUseCase.execute(category)

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppException(
        'This category is already registered.',
        StatusCodes.CONFLICT,
      ),
    )
  })
})
