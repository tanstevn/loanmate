import { injectable } from "inversify";
import {
  IPipelineBehavior,
  RequestHandlerDelegate,
} from "../../../application/abstractions/IPipelineBehavior";
import { IRequest } from "../../../application/abstractions/IRequest";

@injectable()
export class LoggingBehavior<TRequest extends {}, TResponse>
  implements IPipelineBehavior<TRequest, TResponse>
{
  async handle(
    request: TRequest,
    next: RequestHandlerDelegate<TResponse>
  ): Promise<TResponse> {
    const start = process.hrtime();
    console.log(`Processing request: ${request.constructor.name}.`);

    const result = await next(request);

    const [seconds, nanoseconds] = process.hrtime(start);
    const endInMilliseconds = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    console.log(
      `Request ${request.constructor.name} completed in ${endInMilliseconds}.`
    );

    return result;
  }
}
