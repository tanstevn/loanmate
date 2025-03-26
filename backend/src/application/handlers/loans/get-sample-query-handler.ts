import { injectable } from "inversify";
import { LoanRepository } from "../../../infrastructure/repositories/loan-repository";
import { IRequestHandler } from "../../abstractions/IRequestHandler";
import {
  GetSampleQuery,
  GetSampleQueryResult,
} from "../../queries/get-sample-query";
import { Result } from "../../../shared/models/result";

@injectable()
export class GetSampleQueryHandler
  implements IRequestHandler<GetSampleQuery, Result<GetSampleQueryResult>>
{
  static RequestType = GetSampleQuery;

  private repository: LoanRepository;

  constructor(repository: LoanRepository) {
    this.repository = repository;
  }

  async handle(request: GetSampleQuery): Promise<Result<GetSampleQueryResult>> {
    console.log("GetSampleQueryHandler.handle!");

    return Result.Success(new GetSampleQueryResult(123));
  }
}
