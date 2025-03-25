export class ValidationException extends Error {
  constructor(message: string, stack: any) {
    super();
    this.message = message;
    this.stack = stack;
  }
}
