import { IRequest } from "../../abstractions/IRequest";

export class GetAllLendersQuery implements IRequest<GetAllLendersQueryResult> {
  public userId?: string;
  public loanId?: string;

  constructor(query: any) {
    this.allocateRequest(query);
  }

  validate(): string[] | null {
    return null;
  }

  private allocateRequest(query: any) {
    if (query.userId) {
      this.userId = query.userId as string;
    } else if (query.loanId) {
      this.loanId = query.loanId as string;
    }
  }
}

export type GetAllLendersQueryResult = {
  name: string;
  monthlyRepayment?: number;
  interestRate: number;
  processingFees: number;
};
