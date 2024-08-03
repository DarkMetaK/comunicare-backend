export class CredentialsAlreadyExistsError extends Error {
  constructor() {
    super('E-mail or phone already exists.')
  }
}
