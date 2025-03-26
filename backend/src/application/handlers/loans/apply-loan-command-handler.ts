import { injectable } from "inversify";
import { Result } from "../../../shared/models/result";
import { IRequestHandler } from "../../abstractions/IRequestHandler";
import {
  ApplyLoanCommand,
  ApplyLoanCommandResult,
} from "../../commands/loans/apply-loan-command";
import { v4 as uuidv4 } from "uuid";
import { InMemoryRepository } from "../../../infrastructure/repositories/in-memory-repository";

@injectable()
export class ApplyLoanCommandHandler
  implements IRequestHandler<ApplyLoanCommand, Result<ApplyLoanCommandResult>>
{
  static RequestType = ApplyLoanCommand;

  private repository: InMemoryRepository;

  constructor(repository: InMemoryRepository) {
    this.repository = repository;
  }

  async handle(
    request: ApplyLoanCommand
  ): Promise<Result<ApplyLoanCommandResult>> {
    return Result.Success({
      id: uuidv4(),
    });
  }
}
