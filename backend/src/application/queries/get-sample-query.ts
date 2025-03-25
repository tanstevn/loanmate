import { IRequest } from "../abstractions/IRequest";

export class GetSampleQuery implements IRequest<GetSampleQueryResult> {
  validate(): string[] | null {
    return null;
  }
}

export class GetSampleQueryResult {
  constructor() {}
}
