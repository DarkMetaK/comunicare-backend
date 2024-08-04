import {
  PostCreate,
  PostsRepository,
  PostWithCategories,
} from '../posts-repository'
import { prisma } from '@/libs/prisma'

export class PrismaPostsRepository implements PostsRepository {
  async create(data: PostCreate): Promise<PostWithCategories> {
    return await prisma.post.create({
      data: {
        region: data.region,
        categories: {
          connect: data.categories.map((category) => ({
            id: category.id,
            name: category.name,
          })),
        },
        user_id: data.user_id,
        title: data.title,
        content: data.content,
        image_url: data.image_url,
      },
      include: {
        author: true,
        categories: true,
      },
    })
  }

  async findById(id: string) {
    return await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        categories: true,
      },
    })
  }
}
