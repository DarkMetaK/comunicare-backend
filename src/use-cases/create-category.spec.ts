import { assert, beforeEach, describe, it } from 'poku'

import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { CreateCategoryUseCase } from './create-category'

let categoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe('Create Category Use Case', async () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(categoriesRepository)
  })

  await it('should be able to create a new category', async () => {
    const { category } = await sut.execute({
      name: 'New Category',
    })

    assert(category)
    assert.equal(category.name, 'New Category')
  })
})
