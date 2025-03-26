import { injectable } from "inversify";
import { LoanRepository } from "../../../infrastructure/repositories/loan-repository";
import { Result } from "../../../shared/models/result";
import { IRequestHandler } from "../../abstractions/IRequestHandler";
import {
  ApplyLoanCommand,
  ApplyLoanCommandResult,
} from "../../commands/loans/apply-loan-command";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class ApplyLoanCommandHandler
  implements IRequestHandler<ApplyLoanCommand, Result<ApplyLoanCommandResult>>
{
  static RequestType = ApplyLoanCommand;

  private repository: LoanRepository;

  constructor(repository: LoanRepository) {
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
