import { assert, beforeEach, describe, it } from 'poku'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  await it('should be able to get user profile', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      phone: '+99 99999-9999',
      email: 'john.doe@example.com',
      password_hash: '12345678',
    })

    const user = await sut.execute({ userId })

    assert(user)
  })

  await it('should not be able to get user profile with incorrect id', async () => {
    try {
      await sut.execute({ userId: 'fake-id' })
    } catch (error) {
      assert(error instanceof ResourceNotFoundError)
    }
  })
})
