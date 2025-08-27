import { IRequest } from "../../abstractions/IRequest";

export class GetAllLendersQuery implements IRequest<GetAllLendersQueryResult> {
  public userId?: string;
  public loanId?: string;

  constructor(query: GetAllLendersQueryProps) {
    this.allocateRequest(query);
  }

  public validate(): string[] | null {
    return null;
  }

  private allocateRequest(query: GetAllLendersQueryProps) {
    if (query.userId) {
      this.userId = query.userId;
    } else if (query.loanId) {
      this.loanId = query.loanId;
    }
  }
}

export type GetAllLendersQueryProps = {
  userId?: string;
  loanId?: string;
};

export type GetAllLendersQueryResult = {
  name: string;
  monthlyRepayment?: number;
  interestRate: number;
  processingFees: number;
};
