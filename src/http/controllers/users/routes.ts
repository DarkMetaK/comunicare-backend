import { FastifyInstance } from 'fastify'

import { registerUser } from './register-user'
import { authenticate } from './authenticate'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)
}
