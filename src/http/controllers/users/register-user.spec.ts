import { execSync } from 'node:child_process'
import request from 'supertest'
import { describe, assert, it, beforeEach } from 'poku'

import { app } from '@/app'

describe('Register User (e2e)', async () => {
  await app.ready()

  beforeEach(() => {
    execSync('npx prisma migrate dev')
    execSync('npx prisma migrate reset --force')
  })

  await it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      phone: '+99 99999-9999',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    assert.equal(response.statusCode, 201)
  })

  await app.close()
})
