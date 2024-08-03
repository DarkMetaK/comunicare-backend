import { assert, beforeEach, describe, it } from 'poku'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CredentialsAlreadyExistsError } from './errors/credentials-already-exists-error'
import { UpdateUserUseCase } from './update-user'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update User Use Case', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })

  await it('should be able to update', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      phone: '+99 99999-9999',
      email: 'john.doe@example.com',
      password_hash: '12345678',
    })

    const { user } = await sut.execute({
      userId,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    })

    assert(user)
    assert.equal(user.id, userId)
    assert.equal(user.name, 'Jane Doe')
    assert.equal(user.email, 'jane.doe@example.com')
  })

  await it('should not be able to update if email is already in use', async () => {
    await usersRepository.create({
      name: 'Jane Doe',
      phone: '+99 99999-9999',
      email: 'jane.doe@example.com',
      password_hash: '12345678',
    })

    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      phone: '+88 88888-8888',
      email: 'john.doe@example.com',
      password_hash: '12345678',
    })

    try {
      await sut.execute({
        userId,
        email: 'jane.doe@example.com',
      })
    } catch (error) {
      assert(error instanceof CredentialsAlreadyExistsError)
    }
  })

  await it('should not be able to update if phone is already in use', async () => {
    await usersRepository.create({
      name: 'Jane Doe',
      phone: '+99 99999-9999',
      email: 'jane.doe@example.com',
      password_hash: '12345678',
    })

    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      phone: '+88 88888-8888',
      email: 'john.doe@example.com',
      password_hash: '12345678',
    })

    try {
      await sut.execute({
        userId,
        phone: '+99 99999-9999',
      })
    } catch (error) {
      assert(error instanceof CredentialsAlreadyExistsError)
    }
  })
})
