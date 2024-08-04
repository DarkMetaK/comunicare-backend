import { randomUUID } from 'node:crypto'

import {
  PostCreate,
  PostsRepository,
  PostWithCategories,
} from '../posts-repository'

export class InMemoryPostsRepository implements PostsRepository {
  public items: PostWithCategories[] = []

  async create(data: PostCreate) {
    const post: PostWithCategories = {
      id: randomUUID(),
      user_id: data.user_id,
      region: data.region,
      image_url: data.image_url ? data.image_url : null,
      title: data.title,
      content: data.content,
      categories: data.categories,
      created_at: new Date(),
      approved_at: null,
      denied_at: null,
    }

    this.items.push(post)
    return post
  }

  async findById(id: string) {
    const post = this.items.find((item) => item.id === id)

    if (!post) {
      return null
    }

    return post
  }
}
