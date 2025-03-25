import { IMediator } from "../../application/abstractions/IMediator";
import { Request, Response } from "express";
import {
  GetSampleQuery,
  GetSampleQueryResult,
} from "../../application/queries/get-sample-query";

export class LoanController {
  private mediator: IMediator;

  constructor(mediator: IMediator) {
    this.mediator = mediator;
  }

  async test(request: Request, response: Response): Promise<void> {
    console.log("loan-controller; success test!");

    console.log(this.mediator);

    const query = new GetSampleQuery();

    const result = await this.mediator.send<
      GetSampleQuery,
      GetSampleQueryResult
    >(query);

    response.status(200).json({
      success: true,
    });
  }
}
