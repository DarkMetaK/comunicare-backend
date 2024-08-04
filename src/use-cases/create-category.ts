import { Category } from '@prisma/client'

import { CategoriesRepository } from '@/repositories/categories-repository'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'

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
    const nameAlreadyExists = await this.categoriesRepository.findById(name)

    if (nameAlreadyExists) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoriesRepository.create({
      id: name,
    })

    return {
      category,
    }
  }
}
