import { Container } from "inversify";
import { REPOSITORIES } from "../../shared/types";
import { LoanRepository } from "../repositories/loan-repository";

export const registerRepositories = (container: Container) => {
  container
    .bind(REPOSITORIES.LoanRepository)
    .to(LoanRepository)
    .inRequestScope();
};
