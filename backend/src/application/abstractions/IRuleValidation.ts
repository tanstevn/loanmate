export interface IRuleValidation<T> {
  field: keyof T;
  validator: (value: T[keyof T]) => boolean;
  errorMessage: string;
}
