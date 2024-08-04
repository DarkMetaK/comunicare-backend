import { Prisma } from '@prisma/client'

import { CategoriesRepository } from '../categories-repository'
import { prisma } from '@/libs/prisma'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryCreateInput) {
    return await prisma.category.create({
      data,
    })
  }

  async findByName(name: string) {
    return await prisma.category.findUnique({
      where: {
        name,
      },
    })
  }

  async findAll() {
    return await prisma.category.findMany()
  }
}
