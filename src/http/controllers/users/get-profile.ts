import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const getProfileQuerySchema = z.object({
    id: z.string().uuid().optional(),
  })

  const { id } = getProfileQuerySchema.parse(request.query)

  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: id || request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
