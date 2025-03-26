export class UnitResult {
  public successful: boolean;
  public error?: string;

  constructor(error?: string) {
    this.error = error;
    this.successful = !this.error;
  }

  static Success(): UnitResult {
    return new UnitResult();
  }

  static Error(error: string): UnitResult {
    return new UnitResult(error);
  }
}

export class Result<TResponse> extends UnitResult {
  public data?: TResponse;

  constructor(data?: TResponse) {
    super();
    this.data = data;
  }

  static Success<TResponse>(data?: TResponse): Result<TResponse> {
    return new Result<TResponse>(data);
  }
}
