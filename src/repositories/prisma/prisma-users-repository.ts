import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '../users-repository'
import { prisma } from '@/libs/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findByPhone(phone: string) {
    return await prisma.user.findUnique({
      where: {
        phone,
      },
    })
  }

  async update(data: User) {
    return await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
