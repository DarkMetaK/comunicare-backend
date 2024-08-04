import { randomUUID } from 'node:crypto'
import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      password_hash: data.password_hash,
      avatar_url: data.avatar_url ? data.avatar_url : null,
      created_at: new Date(),
    }

    this.items.push(user)
    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByPhone(phone: string) {
    const user = this.items.find((item) => item.phone === phone)

    if (!user) {
      return null
    }

    return user
  }

  async update(user: User) {
    const userIndex = this.items.findIndex((item) => item.id === user.id)

    if (userIndex >= 0) {
      this.items[userIndex] = user
    }

    return user
  }
}
