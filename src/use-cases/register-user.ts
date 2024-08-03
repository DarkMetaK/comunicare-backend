import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'
import { CredentialsAlreadyExistsError } from './errors/credentials-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  phone: string
  email: string
  password: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    phone,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)
    const phoneAlreadyExists = await this.usersRepository.findByPhone(phone)

    if (emailAlreadyExists || phoneAlreadyExists) {
      throw new CredentialsAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      phone,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
