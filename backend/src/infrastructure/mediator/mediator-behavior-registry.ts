import { globSync } from "glob";
import path from "path";
import { BEHAVIORS, BehaviorKeys } from "../../shared/types";

export class MediatorBehaviorRegistry {
  private registeredBehaviors: symbol[];

  constructor() {
    this.registeredBehaviors = [];
  }

  async registerPipelineBehaviorsByDirectoryPath(
    behaviorsPath: string
  ): Promise<void> {
    const files = globSync(behaviorsPath);

    for (const file of files) {
      const behaviorClass = await import(path.resolve(file));
      const behaviorClassName = behaviorClass.name as BehaviorKeys;
      const behaviorSymbol = BEHAVIORS[behaviorClassName];

      this.registeredBehaviors.push(behaviorSymbol);
    }
  }

  get behaviors() {
    return this.registeredBehaviors.reverse();
  }
}
