import { assert, beforeEach, describe, it } from 'poku'
import { compare } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CredentialsAlreadyExistsError } from './errors/credentials-already-exists-error'
import { RegisterUserUseCase } from './register-user'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  await it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      phone: '+99 99999-9999',
      email: 'john.doe@example.com',
      password: '12345678',
    })

    assert(user)
  })

  await it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      phone: '+99 99999-9999',
      email: 'john.doe@example.com',
      password: '12345678',
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      user.password_hash,
    )

    assert(isPasswordCorrectlyHashed)
  })

  await it('should not be able to register with the same email twice', async () => {
    const email = 'john.doe@example.com'

    await sut.execute({
      name: 'John Doe',
      phone: '+99 99999-9999',
      email,
      password: '12345678',
    })

    try {
      await sut.execute({
        name: 'Jane Doe',
        phone: '+88 88888-8888',
        email,
        password: '12345678',
      })
    } catch (error) {
      assert(error instanceof CredentialsAlreadyExistsError)
    }
  })

  await it('should not be able to register with the same phone twice', async () => {
    const phone = '+99 99999-9999'

    await sut.execute({
      name: 'John Doe',
      phone,
      email: 'john.doe@example.com',
      password: '12345678',
    })

    try {
      await sut.execute({
        name: 'Jane Doe',
        phone,
        email: 'jane.doe@example.com',
        password: '12345678',
      })
    } catch (error) {
      assert(error instanceof CredentialsAlreadyExistsError)
    }
  })
})
