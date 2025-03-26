import { IMediator } from "../../application/abstractions/IMediator";
import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import {
  ApplyLoanCommand,
  ApplyLoanCommandProps,
} from "../../application/commands/loans/apply-loan-command";

@injectable()
export class LoanController {
  private mediator: IMediator;

  constructor(mediator: IMediator) {
    this.mediator = mediator;
  }

  async apply(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestBody = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        emailAddress: request.body.emailAddress,
        employmentStatus: request.body.employmentStatus,
        employerName: request.body.employerName,
        loanPurpose: request.body.loanPurpose,
        loanAmount: request.body.loanAmount,
        loanDeposit: request.body.loanDeposit,
        loanTerm: request.body.loanTerm,
      } as ApplyLoanCommandProps;

      const command = new ApplyLoanCommand(requestBody);
      const result = await this.mediator.send(command);

      response.status(201).json(result);
    } catch (error: unknown) {
      next(error);
    }
  }
}
