import { randomUUID } from 'node:crypto'
import { Prisma, Category } from '@prisma/client'

import { CategoriesRepository } from '../categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  async create(data: Prisma.CategoryCreateInput) {
    const category: Category = {
      id: randomUUID(),
      name: data.name,
      created_at: new Date(),
    }

    this.items.push(category)
    return category
  }

  async findByName(name: string) {
    const category = this.items.find(
      (item) => item.name.toUpperCase() === name.toUpperCase(),
    )

    if (!category) {
      return null
    }

    return category
  }

  async findAll() {
    return this.items
  }
}
