import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/hooks/verify-jwt'
import { registerUser } from './register-user'
import { authenticate } from './authenticate'
import { getProfile } from './get-profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)

  /* Authenticated */
  app.get('/users', { onRequest: [verifyJWT] }, getProfile)
}
