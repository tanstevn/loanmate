export const HANDLERS = {
  TEST: Symbol.for("TEST"),
};

export const BEHAVIORS = {
  TEST: Symbol.for("TEST"),
};

export const SERVICES = {
  Mediator: Symbol.for("Mediator"),
};

export const CONTROLLERS = {
  LoanController: Symbol.for("LoanController"),
  UserController: Symbol.for("UserController"),
};

export type HandlerKeys = keyof typeof HANDLERS;
export type BehaviorKeys = keyof typeof BEHAVIORS;
export type ServiceKeys = keyof typeof SERVICES;
export type ControllerKeys = keyof typeof CONTROLLERS;
