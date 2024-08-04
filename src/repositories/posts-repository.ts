import { Post, Category } from '@prisma/client'

export interface PostWithCategories extends Post {
  categories: Category[]
}

export interface PostCreate {
  image_url?: string | null
  region: string
  title: string
  content: string
  created_at?: Date | string
  user_id: string
  categories: Category[]
}

export interface PostsRepository {
  create(data: PostCreate): Promise<PostWithCategories>
  findById(id: string): Promise<PostWithCategories | null>
  update(data: Post): Promise<PostWithCategories>
}
