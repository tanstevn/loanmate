import { LenderController } from "../../../apis/controller/lender-controller";
import { mapV1Routes } from "../../../apis/routes/v1/routes";
import { IMediator } from "../../../application/abstractions/IMediator";
import express from "express";
import request from "supertest";
import { Result } from "../../../shared/models/result";
import { GetAllLendersQueryResult } from "../../../application/queries/lenders/get-all-lenders-query";

describe("Lender Controller", () => {
  let controller: LenderController;
  let mockMediator: jest.Mocked<IMediator>;

  const app = express();

  app.use(express.json());
  app.use("/api/v1/", mapV1Routes());

  beforeEach(() => {
    mockMediator = {
      send: jest.fn(),
    };

    mockMediator.send.mockResolvedValue(
      Result.Success<GetAllLendersQueryResult[]>([
        {
          name: "Driva 1",
          interestRate: 5,
          processingFees: 200,
        },
        {
          name: "Driva 2",
          interestRate: 4,
          processingFees: 250,
        },
        {
          name: "Driva 3",
          interestRate: 6,
          processingFees: 100,
        },
      ])
    );

    controller = new LenderController(mockMediator);
  });

  it("unit - should return 200 ok status with list of all available lenders without monthlyRepayment", async () => {
    const request = {
      query: {
        userId: "",
      },
    } as any;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const next = jest.fn();

    await controller.getAllLenders(request, response, next);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(
      Result.Success<GetAllLendersQueryResult[]>([
        {
          name: "Driva 1",
          interestRate: 5,
          processingFees: 200,
        },
        {
          name: "Driva 2",
          interestRate: 4,
          processingFees: 250,
        },
        {
          name: "Driva 3",
          interestRate: 6,
          processingFees: 100,
        },
      ])
    );
  });

  it("unit - should return 200 ok status with list of all available lenders with monthlyRepayment", async () => {
    mockMediator.send.mockResolvedValue(
      Result.Success<GetAllLendersQueryResult[]>([
        {
          name: "Driva 1",
          interestRate: 5,
          processingFees: 200,
          monthlyRepayment: 14133.909071907052,
        },
        {
          name: "Driva 2",
          interestRate: 4,
          processingFees: 250,
          monthlyRepayment: 13668.806336489577,
        },
        {
          name: "Driva 3",
          interestRate: 6,
          processingFees: 100,
          monthlyRepayment: 14608.554483781043,
        },
      ])
    );

    const request = {
      query: {
        userId: "37dba652-d01f-4ebb-be2a-97096d1f5673",
      },
    } as any;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const next = jest.fn();

    await controller.getAllLenders(request, response, next);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(
      Result.Success<GetAllLendersQueryResult[]>([
        {
          name: "Driva 1",
          interestRate: 5,
          processingFees: 200,
          monthlyRepayment: 14133.909071907052,
        },
        {
          name: "Driva 2",
          interestRate: 4,
          processingFees: 250,
          monthlyRepayment: 13668.806336489577,
        },
        {
          name: "Driva 3",
          interestRate: 6,
          processingFees: 100,
          monthlyRepayment: 14608.554483781043,
        },
      ])
    );
  });
});
