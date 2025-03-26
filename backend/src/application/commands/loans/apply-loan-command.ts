import { Result } from "../../../shared/models/result";
import { IRequest } from "../../abstractions/IRequest";

export class ApplyLoanCommand
  implements IRequest<Result<ApplyLoanCommandResult>>
{
  private request: ApplyLoanCommandProps;

  constructor(request: ApplyLoanCommandProps) {
    this.request = request;
  }

  validate(): string[] | null {
    const errors: string[] = [];

    if (!this.request.firstName) {
      errors.push("First name is required");
    }

    if (!this.request.lastName) {
      errors.push("Last name is required");
    }

    if (!this.request.emailAddress) {
      errors.push("Email address is required");
    }

    if (
      this.request.employmentStatus === "Employed" &&
      !this.request.employerName
    ) {
      errors.push("Employer name is required");
    }

    if (!this.request.loanAmount) {
      errors.push("Loan amount is required");
    }

    if (!this.request.loanTerm) {
      errors.push("Loan term is required");
    }

    return errors;
  }
}

export type ApplyLoanCommandResult = {
  id: string;
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
