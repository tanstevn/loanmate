import { Container } from "inversify";
import { CONTROLLERS, SERVICES } from "../../shared/types";
import { LoanController } from "../../apis/controller/loan-controller";
import { IMediator } from "../../application/abstractions/IMediator";
import { UserController } from "../../apis/controller/user-controller";

export const registerControllers = (container: Container) => {
  container
    .bind(CONTROLLERS.LoanController)
    .toDynamicValue((context) => {
      const mediator = context.get(SERVICES.Mediator) as IMediator;
      return new LoanController(mediator);
    })
    .inTransientScope();

  container
    .bind(CONTROLLERS.UserController)
    .toDynamicValue((context) => {
      const mediator = context.get(SERVICES.Mediator) as IMediator;
      return new UserController(mediator);
    })
    .inTransientScope();
};
