export class Lender {
  public id: string;
  public name: string;
  public interestRate: number;
  public processingFees: number;

  constructor(
    id: string,
    name: string,
    interestRate: number,
    processingFees: number
  ) {
    this.id = id;
    this.name = name;
    this.interestRate = interestRate;
    this.processingFees = processingFees;
  }
}
