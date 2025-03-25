import { IMediator } from "../../application/abstractions/IMediator";

export class UserController {
  private mediator: IMediator;

  constructor(mediator: IMediator) {
    this.mediator = mediator;
  }
}
