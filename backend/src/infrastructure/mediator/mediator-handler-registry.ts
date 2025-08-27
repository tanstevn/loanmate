import fs from "fs";
import { HANDLERS, HandlerKeys } from "../../shared/types";
import path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);

export class MediatorHandlerRegistry {
  public handlers: Map<any, symbol>;

  constructor() {
    this.handlers = new Map<any, symbol>();
  }

  public async registerRequestHandlersByDirectoryPath(
    handlersPath: string
  ): Promise<void> {
    const files = await readdir(handlersPath, {
      withFileTypes: true,
    });

    await this.getRequestHandlersRecursive(handlersPath, files);
  }

  private async getRequestHandlersRecursive(
    handlersPath: string,
    files: fs.Dirent[]
  ): Promise<void> {
    await Promise.all(
      files.map(async (file) => {
        try {
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
            const subFolder = await readdir(subFolderPath, {
              withFileTypes: true,
            });

            await this.getRequestHandlersRecursive(handlersPath, subFolder);
          }
        } catch (error: unknown) {
          console.error(
            `Error registering to mediator handler ${file.name}:`,
            error
          );
          // TO DO: Thrwo custom exception here
        }
      })
    );
  }
}
