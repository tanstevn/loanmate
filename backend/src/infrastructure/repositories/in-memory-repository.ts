import { Lender } from "../../domain/entities/lender";
import { Loan } from "../../domain/entities/loan";
import { User } from "../../domain/entities/user";
import { v4 as uuidv4 } from "uuid";

export class InMemoryRepository {
  private data: Record<string, any[]> = {};

  constructor() {
    this.data["Users"] = [];
    this.data["Loans"] = [];
    this.data["Lenders"] = [];

    const userUUID = uuidv4();

    this.data["Users"].push({
      id: userUUID,
      firstName: "Steven Lester",
      lastName: "Tan",
      emailAddress: "test@email.com",
      employmentStatus: "Employed",
      employerName: "Driva",
    } as User);

    this.data["Loans"].push({
      id: uuidv4(),
      userId: userUUID,
      loanAmount: 1000000,
      loanDeposit: 500000,
      loanPurpose: "Vehicle",
      loanTerm: 7,
    } as Loan);

    this.data["Lenders"].push({
      id: uuidv4(),
      interestRate: 5,
      name: "Driva 1",
      processingFees: 200,
    } as Lender);

    this.data["Lenders"].push({
      id: uuidv4(),
      interestRate: 4,
      name: "Driva 2",
      processingFees: 250,
    } as Lender);

    this.data["Lenders"].push({
      id: uuidv4(),
      interestRate: 6,
      name: "Driva 3",
      processingFees: 100,
    } as Lender);
  }

  getEntity(name: string): any[] {
    if (!this.data[name]) {
      this.data[name] = [];
    }

    return this.data[name] as any[];
  }

  add(name: string, item: any): void {
    this.getEntity(name).push(item);
  }
}
