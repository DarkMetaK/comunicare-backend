import { assert, beforeEach, describe, it } from 'poku'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  await it('should be able to authenticate', async () => {
    const email = 'john.doe@example.com'
    const password = '12345678'

    await usersRepository.create({
      name: 'John Doe',
      phone: '+99 99999-9999',
      email,
      password_hash: await hash(password, 6),
    })

    const { user } = await sut.execute({
      email,
      password,
    })

    assert(user)
  })

  await it('should not be able to authenticate with wrong email', async () => {
    const email = 'john.doe@example.com'
    const password = '12345678'

    try {
      await sut.execute({
        email,
        password,
      })
    } catch (error) {
      assert(error instanceof InvalidCredentialsError)
    }
  })

  await it('should not be able to authenticate with wrong password', async () => {
    const email = 'john.doe@example.com'
    const password = '12345678'

    await usersRepository.create({
      name: 'John Doe',
      phone: '+99 99999-9999',
      email,
      password_hash: await hash(password, 6),
    })

    try {
      await sut.execute({
        email,
        password: 'wrong password',
      })
    } catch (error) {
      assert(error instanceof InvalidCredentialsError)
    }
  })
})
