import { execSync } from 'node:child_process'
import request from 'supertest'
import { describe, assert, it, beforeEach } from 'poku'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/libs/prisma'

describe('Get Profile (e2e)', async () => {
  await app.ready()

  beforeEach(() => {
    execSync('npx prisma migrate dev')
    execSync('npx prisma migrate reset --force')
  })

  await it('should be able to get current user profile', async () => {
    const { token } = await createAndAuthenticateUser(app, {})

    const profileResponse = await request(app.server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .send()

    assert.equal(profileResponse.statusCode, 200)
    assert.equal(profileResponse.body.user.name, 'John Doe')
  })

  await it('should be able to get other user profile by id', async () => {
    const { token } = await createAndAuthenticateUser(app, {})

    const { id } = await prisma.user.create({
      data: {
        name: 'Jane Doe',
        phone: '+88 88888-8888',
        email: 'jane.doe@example.com',
        password_hash: '12345678',
      },
    })

    const profileResponse = await request(app.server)
      .get('/users')
      .query({
        id,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    assert.equal(profileResponse.statusCode, 200)
    assert.equal(profileResponse.body.user.name, 'Jane Doe')
  })

  await app.close()
})
