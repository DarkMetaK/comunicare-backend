import { Prisma, Category } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  findByName(name: string): Promise<Category | null>
  findAll(): Promise<Category[]>
}
