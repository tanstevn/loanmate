export type RequestHandlerDelegate<TResponse> = () => Promise<TResponse>;

export interface IPipelineBehavior<TRequest extends {}, TResponse> {
  handle(
    request: TRequest,
    next: RequestHandlerDelegate<TResponse>
  ): Promise<TResponse>;
}
