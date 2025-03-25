import { Container } from "inversify";
import { IRequest } from "../../application/abstractions/IRequest";
import { IRequestHandler } from "../../application/abstractions/IRequestHandler";
import { IPipelineBehavior } from "../../application/abstractions/IPipelineBehavior";
import { IMediator } from "../../application/abstractions/IMediator";

interface MediatorProps {
  container: Container;
  handlers: Map<any, symbol>;
  behaviors: symbol[];
}

export class Mediator implements IMediator {
  private container: Container;
  private handlers: Map<any, symbol>;
  private behaviors: symbol[];

  constructor({ container, handlers, behaviors }: MediatorProps) {
    this.container = container;
    this.handlers = handlers;
    this.behaviors = behaviors;
  }

  async send<TRequest extends IRequest<TResponse>, TResponse>(
    request: TRequest
  ): Promise<TResponse> {
    const handlerSymbol = this.handlers.get(request.constructor);

    if (!handlerSymbol) {
      throw new Error(`No handler registered for ${request}`);
    }

    const requestHandler = this.container.get(
      handlerSymbol!
    ) as IRequestHandler<TRequest, TResponse>;

    const lastHandler = async () => {
      return requestHandler.handle(request);
    };

    let aggregateResult = lastHandler;

    this.behaviors.forEach((behaviorSymbol) => {
      const behavior = this.container.get(behaviorSymbol) as IPipelineBehavior<
        TRequest,
        TResponse
      >;
      const nextValue = aggregateResult;

      aggregateResult = async () => {
        return await behavior.handle(request, nextValue);
      };
    });

    return await aggregateResult();
  }
}
