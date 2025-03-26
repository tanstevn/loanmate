"use client";

import { Card } from "../../components/Card";
import { useApiQuery, useUserIdContext } from "../../hooks/query";

interface LendersAllResponse {
  name: string;
  monthlyRepayment?: number;
  interestRate: number;
  processingFees: number;
}

const LendersList = () => {
  const userIdContext = useUserIdContext();

  const { data: lenders } = useApiQuery<LendersAllResponse[]>("/lenders/all", {
    userId: userIdContext?.userId,
  });

  return (
    <div>
      <div className="flex mb-4 gap-6">
        {lenders?.map((lender) => {
          return (
            <Card>
              <Card.Title>{lender.name}</Card.Title>
              <Card.Body>
                <ul className="flex flex-col gap-3">
                  {lender.monthlyRepayment && (
                    <li>
                      <div>
                        <label className="text-md font-medium">
                          Monthly repayment:
                        </label>
                        <label>${lender.monthlyRepayment}</label>
                      </div>
                    </li>
                  )}
                  <li>
                    <div>
                      <label className="text-md font-medium">
                        Interest rate:{" "}
                      </label>
                      <label className="text-md font-medium">
                        {lender.interestRate}%
                      </label>
                    </div>
                  </li>
                  <li>
                    <div>
                      <label className="text-md font-medium">
                        Processing fees:{" "}
                      </label>
                      <label className="text-md font-medium">
                        ${lender.processingFees}
                      </label>
                    </div>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LendersList;
