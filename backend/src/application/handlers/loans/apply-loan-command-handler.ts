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
    const user = {
      id: uuidv4(),
      firstName: request.requestBody.firstName,
      lastName: request.requestBody.lastName,
      emailAddress: request.requestBody.emailAddress,
      employmentStatus: request.requestBody.employmentStatus,
      employerName: request.requestBody.employerName,
    };

    const loan = {
      id: uuidv4(),
      userId: user.id,
      loanPurpose: request.requestBody.loanPurpose,
      loanAmount: request.requestBody.loanAmount,
      loanDeposit: request.requestBody.loanDeposit,
      loanTerm: request.requestBody.loanTerm,
    };

    this.repository.add("Users", user);
    this.repository.add("Loans", loan);

    return Result.Success({
      userId: user.id,
      loanId: loan.id,
    });
  }
}
