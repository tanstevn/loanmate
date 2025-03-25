import { IMediator } from "../../application/abstractions/IMediator";

export class LoanController {
  private mediator: IMediator;

  constructor(mediator: IMediator) {
    this.mediator = mediator;
  }
}
