import "reflect-metadata";
import { Container } from "inversify";
import { registerMediator } from "./mediator-bindings";
import { registerControllers } from "./controller-bindings";
import { registerRepositories } from "./repository-bindings";
import { registerRequestHandlers } from "./handler-bindings";
import { registerPipelineBehaviors } from "./behavior-bindings";

const container = new Container();

registerControllers(container);
registerRepositories(container);
registerRequestHandlers(container);
registerPipelineBehaviors(container);
registerMediator(container);

export default container;
