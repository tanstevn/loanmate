import { IRequest } from "../../abstractions/IRequest";

export class GetAllLendersQuery implements IRequest<GetAllLendersQueryResult> {
  public userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  validate(): string[] | null {
    return null;
  }
}

export type GetAllLendersQueryResult = {
  name: string;
  monthlyRepayment?: number;
  interestRate: number;
  processingFees: number;
};
