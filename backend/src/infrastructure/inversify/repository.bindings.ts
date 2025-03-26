import { Container } from "inversify";
import { REPOSITORIES } from "../../shared/types";
import { InMemoryRepository } from "../repositories/in-memory-repository";

export const registerRepositories = (container: Container) => {
  container
    .bind(REPOSITORIES.InMemoryRepository)
    .to(InMemoryRepository)
    .inRequestScope();
};
