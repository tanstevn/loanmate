import { IRequest } from "./IRequest";

export type RequestHandlerDelegate<TResponse> = (
  request: any
) => Promise<TResponse>;

export interface IPipelineBehavior<
  TRequest extends IRequest<TResponse>,
  TResponse,
> {
  handle(
    request: TRequest,
    next: RequestHandlerDelegate<TResponse>
  ): Promise<TResponse>;
}
