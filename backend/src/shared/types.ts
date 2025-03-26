export const HANDLERS = {
  ApplyLoanCommandHandler: Symbol.for("ApplyLoanCommandHandler"),
  GetAllLendersQueryHandler: Symbol.for("GetAllLendersQueryHandler"),
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
  LenderController: Symbol.for("LenderController"),
};

export const REPOSITORIES = {
  InMemoryRepository: Symbol.for("InMemoryRepository"),
};

export type HandlerKeys = keyof typeof HANDLERS;
export type BehaviorKeys = keyof typeof BEHAVIORS;
