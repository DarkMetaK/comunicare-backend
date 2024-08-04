import { Category } from '@prisma/client'

import { CategoriesRepository } from '@/repositories/categories-repository'
import { CategoryNameAlreadyInUseError } from './errors/category-name-already-in-use-error'

interface CreateCategoryUseCaseRequest {
  name: string
}

interface CreateCategoryUseCaseResponse {
  category: Category
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    name,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const nameAlreadyInUse = await this.categoriesRepository.findByName(name)

    if (nameAlreadyInUse) {
      throw new CategoryNameAlreadyInUseError()
    }

    const category = await this.categoriesRepository.create({
      name,
    })

    return {
      category,
    }
  }
}
