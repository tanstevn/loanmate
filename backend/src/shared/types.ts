export const HANDLERS = {
  GetSampleQueryHandler: Symbol.for("GetSampleQueryHandler"),
};

export const BEHAVIORS = {
  LoggingBehavior: Symbol.for("LoggingBehavior"),
  ValidationBehavior: Symbol.for("ValidationBehavior"),
};

export const SERVICES = {
  Mediator: Symbol.for("Mediator"),
};

export const CONTROLLERS = {
  LoanController: Symbol.for("LoanController"),
  UserController: Symbol.for("UserController"),
};

export const REPOSITORIES = {
  LoanRepository: Symbol.for("LoanRepository"),
};

export type HandlerKeys = keyof typeof HANDLERS;
export type BehaviorKeys = keyof typeof BEHAVIORS;
export type ServiceKeys = keyof typeof SERVICES;
export type ControllerKeys = keyof typeof CONTROLLERS;
export type RepositoryKeys = keyof typeof REPOSITORIES;
