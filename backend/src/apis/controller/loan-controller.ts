import { IMediator } from "../../application/abstractions/IMediator";
import { Request, Response } from "express";

export class LoanController {
  private mediator: IMediator;

  constructor(mediator: IMediator) {
    this.mediator = mediator;
  }

  async test(request: Request, response: Response): Promise<void> {
    console.log("loan-controller; success test!");

    response.status(200).json({
      success: true,
    });
  }
}
