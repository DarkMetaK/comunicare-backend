export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super('Provided name for category is already in use.')
  }
}
