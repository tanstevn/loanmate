import { Container } from "inversify";
import path from "path";
import { MediatorHandlerRegistry } from "../mediator/mediator-handler-registry";
import { MediatorBehaviorRegistry } from "../mediator/mediator-behavior-registry";
import { SERVICES } from "../../shared/types";
import { Mediator } from "../mediator/mediator";

export const registerMediator = (container: Container) => {
  const handlersPath = path.join(
    __dirname,
    "../../application/handlers/**/*.ts"
  );
  const behaviorsPath = path.join(
    __dirname,
    "../../apis/middlewares/behaviors/*.ts"
  );

  const handlerRegistry = new MediatorHandlerRegistry();
  const behaviorRegistry = new MediatorBehaviorRegistry();

  handlerRegistry.registerRequestHandlersByDirectoryPath(handlersPath);
  behaviorRegistry.registerPipelineBehaviorsByDirectoryPath(behaviorsPath);

  container.bind(SERVICES.Mediator).toDynamicValue(() => {
    const args = {
      container,
      handlers: handlerRegistry.handlers,
      behaviors: behaviorRegistry.behaviors,
    };

    return new Mediator(args);
  });
};
