export interface IRequest<TResponse> {
  validate(): string[] | null;
}
