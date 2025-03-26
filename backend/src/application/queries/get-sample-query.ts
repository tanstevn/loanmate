import { IRequest } from "../abstractions/IRequest";

export class GetSampleQuery implements IRequest<GetSampleQueryResult> {
  validate(): string[] | null {
    return ["Hello, World!"];
  }
}

export class GetSampleQueryResult {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }
}
