import { globSync } from "fs";
import { HANDLERS, HandlerKeys } from "../../shared/types";
import path from "path";

export class MediatorHandlerRegistry {
    private registeredHandlers: Map<any, symbol>;

    constructor() {
        this.registeredHandlers = new Map<any, symbol>();
    }

    async registerRequestHandlersByDirectoryPath(handlersPath: string): Promise<void> {
        const files = globSync(handlersPath);

        for (const file of files) {
            const handlerClass = await import(path.resolve(file));
            const handlerClasSName = handlerClass.name as HandlerKeys;
            const handlerSymbol = HANDLERS[handlerClasSName];

            this.registeredHandlers.set(handlerClass.RequestType, handlerSymbol);
        }
    }

    get handlers() {
        return this.registeredHandlers;
    }
};