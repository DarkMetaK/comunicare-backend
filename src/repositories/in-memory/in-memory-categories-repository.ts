import { Prisma, Category } from '@prisma/client'

import { CategoriesRepository } from '../categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  async create(data: Prisma.CategoryCreateInput) {
    const category: Category = {
      id: data.id,
      created_at: new Date(),
    }

    this.items.push(category)
    return category
  }

  async findById(id: string) {
    const category = this.items.find((item) => item.id === id)

    if (!category) {
      return null
    }

    return category
  }

  async findAll() {
    return this.items
  }
}
