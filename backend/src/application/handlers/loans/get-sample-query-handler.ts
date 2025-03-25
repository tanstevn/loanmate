import { LoanRepository } from "../../../infrastructure/repositories/loan-repository";
import { IRequestHandler } from "../../abstractions/IRequestHandler";
import {
  GetSampleQuery,
  GetSampleQueryResult,
} from "../../queries/get-sample-query";

export class GetSampleQueryHandler
  implements IRequestHandler<GetSampleQuery, GetSampleQueryResult>
{
  static RequestType = GetSampleQuery;

  private repository: LoanRepository;

  constructor(repository: LoanRepository) {
    this.repository = repository;
  }

  handle(request: GetSampleQuery): Promise<GetSampleQueryResult> {
    console.log("GetSampleQueryHandler.handle!");

    throw new Error("GetSampleQueryHandler.handle!");
  }
}
