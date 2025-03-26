import { Container } from "inversify";
import { HANDLERS, REPOSITORIES } from "../../shared/types";
import { LoanRepository } from "../repositories/loan-repository";
import { ApplyLoanCommandHandler } from "../../application/handlers/loans/apply-loan-command-handler";

export const registerRequestHandlers = (container: Container) => {
  container
    .bind(HANDLERS.ApplyLoanCommandHandler)
    .toDynamicValue((context) => {
      const repository = context.get(
        REPOSITORIES.LoanRepository
      ) as LoanRepository;

      return new ApplyLoanCommandHandler(repository);
    })
    .inTransientScope();
};
