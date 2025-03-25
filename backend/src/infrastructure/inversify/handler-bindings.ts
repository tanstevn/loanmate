import { Container } from "inversify";
import { HANDLERS, REPOSITORIES } from "../../shared/types";
import { LoanRepository } from "../repositories/loan-repository";
import { GetSampleQueryHandler } from "../../application/handlers/loans/get-sample-query-handler";

export const registerRequestHandlers = (container: Container) => {
  container
    .bind(HANDLERS.GetSampleQueryHandler)
    .toDynamicValue((context) => {
      const repository = context.get(
        REPOSITORIES.LoanRepository
      ) as LoanRepository;

      return new GetSampleQueryHandler(repository);
    })
    .inTransientScope();
};
