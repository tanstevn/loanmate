export type ResultErrors = string[];

export interface UnitResult {
  successful: boolean;
  error: ResultErrors;
}

export interface Result<T> extends UnitResult {
  data: T;
}
