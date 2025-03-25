import { injectable } from "inversify";
import { IMediator } from "../../application/abstractions/IMediator";
import { Request, Response } from "express";

@injectable()
export class UserController {
  private mediator: IMediator;

  constructor(mediator: IMediator) {
    this.mediator = mediator;
  }

  async test(request: Request, response: Response): Promise<void> {
    console.log("user-controller; success test!");

    response.status(200).json({
      success: true,
    });
  }
}
