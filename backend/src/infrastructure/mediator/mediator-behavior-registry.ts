import path from "path";
import { BEHAVIORS, BehaviorKeys } from "../../shared/types";
import fs from "fs";
import { promisify } from "util";

const readdir = promisify(fs.readdir);

export class MediatorBehaviorRegistry {
  public behaviors: symbol[];

  constructor() {
    this.behaviors = [];
  }

  public async registerPipelineBehaviorsByDirectoryPath(
    behaviorsPath: string
  ): Promise<void> {
    const files = await readdir(behaviorsPath, {
      withFileTypes: true,
    });

    await Promise.all(
      files.map(async (file) => {
        try {
          const behaviorFile = path.join(behaviorsPath, file.name);
          const behaviorClass = (await import(behaviorFile)) as Object;

          const behaviorClassName = Object.keys(behaviorClass).at(
            0
          ) as BehaviorKeys;

          const behaviorSymbol = BEHAVIORS[behaviorClassName];
          this.behaviors.push(behaviorSymbol);
        } catch (error: unknown) {
          console.error(`Error registering behavior ${file.name}:`, error);
          // TO DO: Throw custom exception here
        }
      })
    );
  }
}
