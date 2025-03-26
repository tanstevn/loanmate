import { IMediator } from "../../application/abstractions/IMediator";
import { NextFunction, Request, Response } from "express";
import {
  GetSampleQuery,
  GetSampleQueryResult,
} from "../../application/queries/get-sample-query";
import { injectable } from "inversify";

@injectable()
export class LoanController {
  private mediator: IMediator;

  constructor(mediator: IMediator) {
    this.mediator = mediator;
  }

  async test(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("loan-controller; success test!");

      const query = new GetSampleQuery();

      const result = await this.mediator.send<
        GetSampleQuery,
        GetSampleQueryResult
      >(query);

      response.status(200).json(result);
    } catch (error: unknown) {
      next(error);
    }
  }
}
