export class Loan {
  public id: string;
  public userId: string;
  public loanPurpose: string;
  public loanAmount: number;
  public loanDeposit: number;
  public loanTerm: number;

  constructor(
    id: string,
    userId: string,
    loanPurpose: string,
    loanAmount: number,
    loanDeposit: number,
    loanTerm: number
  ) {
    this.id = id;
    this.userId = userId;
    this.loanPurpose = loanPurpose;
    this.loanAmount = loanAmount;
    this.loanDeposit = loanDeposit;
    this.loanTerm = loanTerm;
  }
}
