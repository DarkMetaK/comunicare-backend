import { assert, beforeEach, describe, it } from 'poku'

import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { InMemoryPostsRepository } from '@/repositories/in-memory/in-memory-posts-repository'
import { CreatePostUseCase } from './create-post'
import { RequiredCategoriesError } from './errors/required-categories-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let postsRepository: InMemoryPostsRepository
let categoriesRepository: InMemoryCategoriesRepository
let sut: CreatePostUseCase

describe('Create Post Use Case', async () => {
  beforeEach(async () => {
    postsRepository = new InMemoryPostsRepository()
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreatePostUseCase(postsRepository, categoriesRepository)

    await categoriesRepository.create({
      id: 'Category 1',
    })

    await categoriesRepository.create({
      id: 'Category 2',
    })
  })

  await it('should be able to create a new post', async () => {
    const { post } = await sut.execute({
      userId: 'userId',
      region: 'sul',
      categories: ['Category 1', 'Category 2'],
      title: 'Title',
      content: 'New post',
    })

    assert(post)
    assert.equal(post.categories.length, 2)
  })

  await it('should not be able to create a post without category', async () => {
    try {
      await sut.execute({
        userId: 'userId',
        region: 'sul',
        categories: [],
        title: 'Title',
        content: 'New post',
      })
    } catch (error) {
      assert(error instanceof RequiredCategoriesError)
    }
  })

  await it('should not be able to create a post with invalid category', async () => {
    try {
      await sut.execute({
        userId: 'userId',
        region: 'sul',
        categories: ['Category 3'],
        title: 'Title',
        content: 'New post',
      })
    } catch (error) {
      assert(error instanceof ResourceNotFoundError)
    }
  })
})
