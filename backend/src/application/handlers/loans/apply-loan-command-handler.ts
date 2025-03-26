import { injectable } from "inversify";
import { Result } from "../../../shared/models/result";
import { IRequestHandler } from "../../abstractions/IRequestHandler";
import {
  ApplyLoanCommand,
  ApplyLoanCommandResult,
} from "../../commands/loans/apply-loan-command";
import { v4 as uuidv4 } from "uuid";
import { InMemoryRepository } from "../../../infrastructure/repositories/in-memory-repository";
import { User } from "../../../domain/entities/user";
import { Loan } from "../../../domain/entities/loan";

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
    const userUUID = uuidv4();
    const userEntity = new User(
      userUUID,
      request.requestBody.firstName,
      request.requestBody.lastName,
      request.requestBody.emailAddress,
      request.requestBody.employmentStatus,
      request.requestBody.employerName
    );

    const loanUUID = uuidv4();
    const loanEntity = new Loan(
      loanUUID,
      userUUID,
      request.requestBody.loanPurpose,
      request.requestBody.loanAmount,
      request.requestBody.loanDeposit,
      request.requestBody.loanTerm
    );

    this.repository.add("Users", userEntity);
    this.repository.add("Loans", loanEntity);

    return Result.Success({
      userId: userUUID,
      loanId: loanUUID,
    });
  }
}
