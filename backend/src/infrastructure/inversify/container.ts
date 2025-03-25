import "reflect-metadata";
import { Container } from "inversify";
import { registerMediator } from "./mediator-bindings";

const container = new Container();

registerMediator(container);

export default container;
