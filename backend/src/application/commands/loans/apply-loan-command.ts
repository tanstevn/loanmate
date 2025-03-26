import { Result } from "../../../shared/models/result";
import { IRequest } from "../../abstractions/IRequest";

export class ApplyLoanCommand
  implements IRequest<Result<ApplyLoanCommandResult>>
{
  public requestBody: ApplyLoanCommandProps;

  constructor(requestBody: ApplyLoanCommandProps) {
    this.requestBody = requestBody;
  }

  validate(): string[] | null {
    const errors: string[] = [];

    if (!this.requestBody.firstName) {
      errors.push("First name is required");
    }

    if (!this.requestBody.lastName) {
      errors.push("Last name is required");
    }

    if (!this.requestBody.emailAddress) {
      errors.push("Email address is required");
    }

    if (
      this.requestBody.employmentStatus === "Employed" &&
      !this.requestBody.employerName
    ) {
      errors.push("Employer name is required");
    }

    if (!this.requestBody.loanAmount) {
      errors.push("Loan amount is required");
    }

    if (!this.requestBody.loanTerm) {
      errors.push("Loan term is required");
    }

    return errors;
  }
}

export type ApplyLoanCommandResult = {
  userId: string;
  loanId: string;
};

export type ApplyLoanCommandProps = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  employmentStatus: "Employed" | "Self-Employed" | "Unemployed";
  employerName?: string;
  loanPurpose: "Vehicle" | "Home Improvement" | "Personal Use";
  loanAmount: number;
  loanDeposit: number;
  loanTerm: number;
};
