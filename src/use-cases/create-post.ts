import { Category } from '@prisma/client'

import {
  PostsRepository,
  PostWithCategories,
} from '@/repositories/posts-repository'
import { CategoriesRepository } from '@/repositories/categories-repository'
import { RequiredCategoriesError } from './errors/required-categories-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePostUseCaseRequest {
  userId: string
  region: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'
  categories: string[]
  imageUrl?: string
  title: string
  content: string
}

interface CreatePostUseCaseResponse {
  post: PostWithCategories
}

export class CreatePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    userId,
    region,
    categories,
    imageUrl,
    title,
    content,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const postCategories: Category[] = []
    const uniqueCategories = [...new Set(categories)]

    if (uniqueCategories.length === 0) {
      throw new RequiredCategoriesError()
    }

    for (const categoryId of uniqueCategories) {
      const category = await this.categoriesRepository.findById(categoryId)

      if (!category) {
        throw new ResourceNotFoundError()
      }

      postCategories.push(category)
    }

    const post = await this.postsRepository.create({
      user_id: userId,
      region,
      image_url: imageUrl,
      title,
      content,
      categories: postCategories,
    })

    return {
      post,
    }
  }
}
