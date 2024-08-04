import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface CreateAndAuthenticateUserProps {
  name?: string
  phone?: string
  email?: string
  password?: string
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  { name, email, password, phone }: CreateAndAuthenticateUserProps,
) {
  await request(app.server)
    .post('/users')
    .send({
      name: name || 'John Doe',
      phone: phone || '+99 99999-9999',
      email: email || 'johndoe@example.com',
      password: password || '12345678',
    })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: email || 'johndoe@example.com',
      password: password || '12345678',
    })

  const { token } = authResponse.body

  return { token }
}
