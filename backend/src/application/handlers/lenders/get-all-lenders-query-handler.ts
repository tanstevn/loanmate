import { injectable } from "inversify";
import { Result } from "../../../shared/models/result";
import { IRequestHandler } from "../../abstractions/IRequestHandler";
import {
  GetAllLendersQuery,
  GetAllLendersQueryResult,
} from "../../queries/lenders/get-all-lenders-query";
import { InMemoryRepository } from "../../../infrastructure/repositories/in-memory-repository";
import { Lender } from "../../../domain/entities/lender";
import { Loan } from "../../../domain/entities/loan";

@injectable()
export class GetAllLendersQueryHandler
  implements
    IRequestHandler<GetAllLendersQuery, Result<GetAllLendersQueryResult[]>>
{
  static RequestType = GetAllLendersQuery;
  private repository: InMemoryRepository;

  constructor(repository: InMemoryRepository) {
    this.repository = repository;
  }

  async handle(
    request: GetAllLendersQuery
  ): Promise<Result<GetAllLendersQueryResult[]>> {
    const lenders = this.repository.getEntity("Lenders") as Lender[];

    if (request.userId) {
      const userLoan = this.repository
        .getEntity("Loans")
        .find((loan) => loan.userId === request.userId) as Loan;

      if (!userLoan) {
        throw new Error(
          `Cannot see requested user id [${request.userId}]in the in-memory database.`
        );
      }

      const result = await Promise.all(
        lenders.map(async (lender) => {
          const monthlyRepayment = this.calculateMonthlyPayment(
            userLoan.loanAmount,
            lender.interestRate,
            userLoan.loanTerm
          );

          return {
            name: lender.name,
            monthlyRepayment,
            interestRate: lender.interestRate,
            processingFees: lender.processingFees,
          } as GetAllLendersQueryResult;
        })
      );

      return Result.Success(result);
    }

    const result = lenders.map((lender) => {
      return {
        name: lender.name,
        interestRate: lender.interestRate,
        processingFees: lender.processingFees,
      } as GetAllLendersQueryResult;
    });

    return Result.Success(result);
  }

  private calculateMonthlyPayment(
    loanAmount: number,
    interestRate: number,
    loanTerm: number
  ): number {
    const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly and percentage to decimal
    const numberOfPayments = loanTerm * 12; // Convert term in years to number of monthly payments

    // Calculate monthly payment using the formula
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    return Number(monthlyPayment.toFixed(2));
  }
}
