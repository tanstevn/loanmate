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

  static Error(errors: string[]): UnitResult {
    return new UnitResult(errors);
  }
}

export class Result<TData> extends UnitResult {
  public success: boolean;
  public data?: TData;

  constructor(data?: TData) {
    super();
    this.success = super.successful;
    this.data = data;
  }

  static Success<TData>(data?: TData): Result<TData> {
    return new Result<TData>(data);
  }
}
