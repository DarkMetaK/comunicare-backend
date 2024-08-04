import { randomUUID } from 'node:crypto'
import { Prisma, Category } from '@prisma/client'

import { CategoriesRepository } from '../categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  async create(data: Prisma.CategoryCreateInput) {
    const category = {
      id: randomUUID(),
      name: data.name,
      created_at: new Date(),
    }

    this.items.push(category)

    return category
  }

  async findAll() {
    return this.items
  }
}
