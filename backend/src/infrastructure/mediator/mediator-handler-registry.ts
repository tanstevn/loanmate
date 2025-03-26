import fs from "fs";
import { HANDLERS, HandlerKeys } from "../../shared/types";
import path from "path";

export class MediatorHandlerRegistry {
  public handlers: Map<any, symbol>;

  constructor() {
    this.handlers = new Map<any, symbol>();
  }

  async #getRequestHandlersRecursive(
    handlersPath: string,
    files: fs.Dirent[]
  ): Promise<void> {
    for (const file of files) {
      if (!file.isDirectory()) {
        const handlerFile = path.join(file.parentPath, file.name);
        const module = await import(handlerFile);

        const handlerClassName = Object.keys(module).at(0) as HandlerKeys;
        const handlerClass = module[handlerClassName];

        if ("RequestType" in handlerClass) {
          const handlerSymbol = HANDLERS[handlerClassName];

          this.handlers.set(handlerClass.RequestType, handlerSymbol);
        }
      } else {
        const subFolderPath = path.join(handlersPath, file.name);

        const subFolder = fs
          .readdirSync(subFolderPath, {
            withFileTypes: true,
          })
          .filter((item) => !item.isDirectory())
          .map((file) => file);

        await this.#getRequestHandlersRecursive(handlersPath, subFolder);
      }
    }
  }

  async registerRequestHandlersByDirectoryPath(
    handlersPath: string
  ): Promise<void> {
    const files = fs.readdirSync(handlersPath, {
      withFileTypes: true,
    });

    await this.#getRequestHandlersRecursive(handlersPath, files);
  }
}
