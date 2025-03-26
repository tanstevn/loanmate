export class ValidationException extends Error {
  constructor(message: string) {
    super();
    this.message = `Bad request. ${message}`;
  }
}
