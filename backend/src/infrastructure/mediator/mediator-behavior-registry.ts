import path from "path";
import { BEHAVIORS, BehaviorKeys } from "../../shared/types";
import fs from "fs";

export class MediatorBehaviorRegistry {
  public behaviors: symbol[];

  constructor() {
    this.behaviors = [];
  }

  async registerPipelineBehaviorsByDirectoryPath(
    behaviorsPath: string
  ): Promise<void> {
    const files = fs
      .readdirSync(behaviorsPath, {
        withFileTypes: true,
      })
      .filter((item) => !item.isDirectory())
      .map((item) => item.name);

    for (const file of files) {
      const behaviorFile = path.join(behaviorsPath, file);
      const behaviorClass = (await import(behaviorFile)) as Object;

      const behaviorClassName = Object.keys(behaviorClass).at(
        0
      ) as BehaviorKeys;

      const behaviorSymbol = BEHAVIORS[behaviorClassName];
      this.behaviors.push(behaviorSymbol);
    }
  }
}
