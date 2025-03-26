export class UnitResult {
  public errors?: string[];

  constructor(errors?: string[]) {
    this.errors = errors;
  }

  get successful() {
    return !this.errors || this.errors.length === 0;
  }

  static Success(): UnitResult {
    return new UnitResult();
  }

  static Errors(errors: string[]): UnitResult {
    return new UnitResult(errors);
  }
}

export class Result<TResponse> extends UnitResult {
  public success: boolean;
  public data?: TResponse;

  constructor(data?: TResponse) {
    super();
    this.success = super.successful;
    this.data = data;
  }

  static Success<TResponse>(data?: TResponse): Result<TResponse> {
    return new Result<TResponse>(data);
  }
}
