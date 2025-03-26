import { LoanController } from "../../../apis/controller/loan-controller";
import { IMediator } from "../../../application/abstractions/IMediator";
import { Result } from "../../../shared/models/result";
import { ApplyLoanCommandResult } from "../../../application/commands/loans/apply-loan-command";
import request from "supertest";
import express from "express";
import { mapV1Routes } from "../../../apis/routes/v1/routes";

describe("Loan Controller", () => {
  let controller: LoanController;
  let mockMediator: jest.Mocked<IMediator>;

  const app = express();

  app.use(express.json());
  app.use("/api/v1/", mapV1Routes());

  beforeEach(() => {
    mockMediator = {
      send: jest.fn(),
    };

    mockMediator.send.mockResolvedValue(
      Result.Success<ApplyLoanCommandResult>({
        id: "56713529-03b1-4a36-8897-8a88f81255a8",
      })
    );

    controller = new LoanController(mockMediator);
  });

  it("unit - should return 201 created status with data id in guid.", async () => {
    const request = {
      body: {
        firstName: "Steven",
        lastName: "Tan",
        emailAddress: "test@email.com",
        employmentStatus: "Employed",
        employerName: "Driva",
        loanPurpose: "Vehicle",
        loanAmount: 1000000,
        loanDeposit: 500000,
        loanTerm: 7,
      },
    } as any;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const next = jest.fn();

    await controller.apply(request, response, next);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(
      Result.Success<ApplyLoanCommandResult>({
        id: "56713529-03b1-4a36-8897-8a88f81255a8",
      })
    );
  });

  it("api - should return 201 created status with data id.", async () => {
    const result = await request(app).post("/api/v1/loans/apply").send({
      firstName: "Steven",
      lastName: "Tan",
      emailAddress: "test@email.com",
      employmentStatus: "Employed",
      employerName: "Driva",
      loanPurpose: "Vehicle",
      loanAmount: 1000000,
      loanDeposit: 500000,
      loanTerm: 7,
    });

    expect(result.status).toBe(201);
    expect(result.body.success).toBe(true);
    expect(result.body.data).not.toBeNull();
    expect(result.body.data.id).not.toBeNull();
  });
});
