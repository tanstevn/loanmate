import { injectable } from "inversify";
import {
  IPipelineBehavior,
  RequestHandlerDelegate,
} from "../../../application/abstractions/IPipelineBehavior";
import { IRequest } from "../../../application/abstractions/IRequest";
import { ValidationException } from "../../../shared/exceptions/validation-exception";

@injectable()
export class ValidationBehavior<TRequest extends {}, TResponse>
  implements IPipelineBehavior<TRequest, TResponse>
{
  async handle(
    request: TRequest,
    next: RequestHandlerDelegate<TResponse>
  ): Promise<TResponse> {
    const req = request as unknown as IRequest<TResponse>;
    const errors = req.validate();

    if (errors && errors.length > 0) {
      throw new ValidationException(
        `Input validation for ${request.constructor.name} failed: ${errors.join(", ")}`
      );
    }

    return await next(req);
  }
}
