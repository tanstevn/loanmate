import { injectable } from "inversify";
import { IMediator } from "../../application/abstractions/IMediator";
import { NextFunction, Request, Response } from "express";
import { GetAllLendersQuery } from "../../application/queries/lenders/get-all-lenders-query";

@injectable()
export class LenderController {
  private mediator: IMediator;

  constructor(mediator: IMediator) {
    this.mediator = mediator;
  }

  async getAllLenders(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const query = new GetAllLendersQuery(request.query);
      const result = await this.mediator.send(query);

      response.status(200).json(result);
    } catch (error: unknown) {
      next(error);
    }
  }
}
