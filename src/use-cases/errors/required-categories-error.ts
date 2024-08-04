export class RequiredCategoriesError extends Error {
  constructor() {
    super('Atleast one category should be provided.')
  }
}
