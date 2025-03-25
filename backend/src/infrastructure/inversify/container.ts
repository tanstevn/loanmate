import "reflect-metadata";
import { Container } from "inversify";
import { registerMediator } from "./mediator-bindings";
import { registerControllers } from "./controller-bindings";

const container = new Container();

registerControllers(container);
registerMediator(container);

export default container;
