import { Container } from "inversify";
import { CONTROLLERS, SERVICES } from "../../shared/types";
import { LoanController } from "../../apis/controller/loan-controller";
import { IMediator } from "../../application/abstractions/IMediator";
import { LenderController } from "../../apis/controller/lender-controller";

export const registerControllers = (container: Container): void => {
  container
    .bind(CONTROLLERS.LoanController)
    .toDynamicValue((context) => {
      const mediator = context.get(SERVICES.Mediator) as IMediator;
      return new LoanController(mediator);
    })
    .inTransientScope();

  container
    .bind(CONTROLLERS.LenderController)
    .toDynamicValue((context) => {
      const mediator = context.get(SERVICES.Mediator) as IMediator;
      return new LenderController(mediator);
    })
    .inTransientScope();
};
