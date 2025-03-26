import { Container } from "inversify";
import { HANDLERS, REPOSITORIES } from "../../shared/types";
import { ApplyLoanCommandHandler } from "../../application/handlers/loans/apply-loan-command-handler";
import { InMemoryRepository } from "../repositories/in-memory-repository";

export const registerRequestHandlers = (container: Container) => {
  container
    .bind(HANDLERS.ApplyLoanCommandHandler)
    .toDynamicValue((context) => {
      const repository = context.get(
        REPOSITORIES.InMemoryRepository
      ) as InMemoryRepository;

      return new ApplyLoanCommandHandler(repository);
    })
    .inTransientScope();
};
