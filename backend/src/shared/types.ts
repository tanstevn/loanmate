export const HANDLERS = {
    TEST: Symbol.for("TEST")
};

export const BEHAVIORS = {
    TEST: Symbol.for("TEST")
};

export const SERVICES = {
    Mediator: Symbol.for("Mediator")
}

export type HandlerKeys = keyof typeof HANDLERS;
export type BehaviorKeys = keyof typeof BEHAVIORS;
export type ServiceKeys = keyof typeof SERVICES;