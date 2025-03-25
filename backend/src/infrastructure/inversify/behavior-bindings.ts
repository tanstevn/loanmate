import { Container } from "inversify";
import { BEHAVIORS } from "../../shared/types";
import { LoggingBehavior } from "../../apis/middlewares/behaviors/logging-behavior";
import { ValidationBehavior } from "../../apis/middlewares/behaviors/validation-behavior";

export const registerPipelineBehaviors = (container: Container): void => {
  container
    .bind(BEHAVIORS.LoggingBehavior)
    .to(LoggingBehavior)
    .inTransientScope();

  container
    .bind(BEHAVIORS.ValidationBehavior)
    .to(ValidationBehavior)
    .inTransientScope();
};
