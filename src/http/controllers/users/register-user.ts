import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'
import { CredentialsAlreadyExistsError } from '@/use-cases/errors/credentials-already-exists-error'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string({ required_error: 'O nome é obrigatório.' }),
    phone: z.string({ required_error: 'O telefone é obrigatório.' }),
    email: z
      .string({ required_error: 'O e-mail é obrigatório.' })
      .email('Insira um e-mail válido.'),
    password: z
      .string({ required_error: 'A senha é obrigatória.' })
      .min(6, 'A senha deve possuir ao menos 6 caracteres.'),
  })

  const { name, phone, email, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUserUseCase = makeRegisterUserUseCase()

    await registerUserUseCase.execute({
      name,
      phone,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof CredentialsAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
