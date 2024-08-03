import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { CredentialsAlreadyExistsError } from './errors/credentials-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateUserUseCaseRequest {
  userId: string
  avatarUrl?: string
  name?: string
  phone?: string
  email?: string
  password?: string
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    avatarUrl,
    name,
    phone,
    email,
    password,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (avatarUrl) {
      user.avatar_url = avatarUrl
    }

    if (email) {
      const emailAlreadyExists = await this.usersRepository.findByEmail(email)

      if (emailAlreadyExists) {
        throw new CredentialsAlreadyExistsError()
      }

      user.email = email
    }

    if (phone) {
      const phoneAlreadyExists = await this.usersRepository.findByPhone(phone)

      if (phoneAlreadyExists) {
        throw new CredentialsAlreadyExistsError()
      }

      user.phone = phone
    }

    if (name) {
      user.name = name
    }

    if (password) {
      user.password_hash = await hash(password, 6)
    }

    await this.usersRepository.update(user)

    return {
      user,
    }
  }
}
