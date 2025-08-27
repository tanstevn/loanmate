import { Result } from "../../../shared/models/result";
import { IRequest } from "../../abstractions/IRequest";
import { IRuleValidation } from "../../abstractions/IRuleValidation";

export class ApplyLoanCommand
  implements IRequest<Result<ApplyLoanCommandResult>>
{
  public requestBody: ApplyLoanCommandProps;

  constructor(requestBody: ApplyLoanCommandProps) {
    this.requestBody = requestBody;
  }

  #applyLoanCommandRules: IRuleValidation<ApplyLoanCommandProps>[] = [
    {
      field: "firstName",
      validator: (value) => typeof value === "string" && Boolean(value),
      errorMessage: "First name is required.",
    },
    {
      field: "lastName",
      validator: (value) => typeof value === "string" && Boolean(value),
      errorMessage: "Last name is required.",
    },
    {
      field: "emailAddress",
      validator: (value) => typeof value === "string" && Boolean(value),
      errorMessage: "Email address is required.",
    },
    {
      field: "employmentStatus",
      validator: (value) => {
        const employmentStatus =
          value as ApplyLoanCommandProps["employmentStatus"];

        return Boolean(employmentStatus === "Employed");
      },
      errorMessage: "Employer name is required.",
    },
    {
      field: "loanAmount",
      validator: (value) => typeof value === "number" && Boolean(value),
      errorMessage: "Loan amount is required.",
    },
    {
      field: "loanTerm",
      validator: (value) => typeof value === "number" && Boolean(value),
      errorMessage: "Loan term is required.",
    },
  ];

  public validate(): string[] | null {
    const errors: string[] = [];

    this.#applyLoanCommandRules.forEach((rule) => {
      const value = this.requestBody[rule.field];

      if (!rule.validator(value)) {
        errors.push(rule.errorMessage);
      }
    });

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
