export type RequestHandlerDelegate<TResponse> = (
  request: any
) => Promise<TResponse>;

export interface IPipelineBehavior<TRequest extends {}, TResponse> {
  handle(
    request: TRequest,
    next: RequestHandlerDelegate<TResponse>
  ): Promise<TResponse>;
}
