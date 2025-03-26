"use client";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useApiMutation, useUserIdContext } from "../../hooks/query";
import { Form } from "../../components/Form";
import SelectInput from "../../components/SelectInput";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z.string().nonempty("Please place your first name"),
  lastName: z
    .string()
    .nonempty("Please place your last name")
    .min(2, "Last name must be not less than 2 characters"),
  emailAddress: z.string().email("Please place a valid email address"),
  employmentStatus: z.string().nonempty("Please select employment status"),
  employerName: z.string(),
  loanPurpose: z
    .string()
    .nonempty("Please select your purpose for loan application"),
  loanAmount: z.coerce
    .number()
    .nonnegative("Please place a non-negative loan amount"),
  loanDeposit: z.coerce
    .number()
    .nonnegative("Please place a non-negative loan deposit"),
  loanTerm: z.coerce
    .number()
    .nonnegative("Please place a non-negative loan term")
    .min(1, "The minimum loan term is 1 year")
    .max(7, "The maximum loan term is 7 years"),
});

type ApplyLoanRequest = z.infer<typeof formSchema>;

interface ApplyLoanResponse {
  userId: string;
  loanId: string;
}

const ApplyLoanPage = () => {
  const navigate = useNavigate();
  const userIdContext = useUserIdContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ApplyLoanRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      employmentStatus: "",
      employerName: "",
      loanPurpose: "",
      loanAmount: undefined,
      loanDeposit: undefined,
      loanTerm: undefined,
    },
  });

  const employmentStatus = watch("employmentStatus");

  const { mutateAsync, isIdle } = useApiMutation<
    ApplyLoanResponse,
    ApplyLoanRequest
  >("/loans/apply", {
    onSuccess(data: ApplyLoanResponse) {
      userIdContext?.setUserId(data.userId);
      navigate("/lenders");
    },
  });

  const onSubmit = (data: ApplyLoanRequest) => {
    if (isIdle) {
      mutateAsync(data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Header
        title="Loan Form"
        description="Upgrade your ride, renovate your home, or fund your dreams—fast."
      />
      <Form.Section>
        <div className="space-y-4">
          <TextInput
            id="firstName"
            label="First name"
            placeholder="Place your given name"
            type="text"
            name="firstName"
            autoComplete="off"
            register={register("firstName")}
            error={errors.firstName}
          />

          <TextInput
            id="lastName"
            label="Last name"
            placeholder="Place your surname"
            type="text"
            name="lastName"
            autoComplete="off"
            register={register("lastName")}
            error={errors.lastName}
          />

          <TextInput
            id="emailAddress"
            label="Email address"
            placeholder="Place your e-mail address"
            type="text"
            name="emailAddress"
            autoComplete="off"
            register={register("emailAddress")}
            error={errors.emailAddress}
          />

          <SelectInput
            id="employmentStatus"
            label="Employment status"
            type="text"
            name="employmentStatus"
            autoComplete="off"
            options={[
              {
                id: "employed",
                value: "Employed",
              },
              {
                id: "selfEmployed",
                value: "Self-Employed",
              },
              {
                id: "unemployed",
                value: "Unemployed",
              },
            ]}
            register={register("employmentStatus")}
            error={errors.employmentStatus}
            isLoading={false}
          />

          {employmentStatus === "employed" && (
            <TextInput
              id="employerName"
              label="Employer name"
              placeholder="Place your employer name"
              type="text"
              name="employerName"
              autoComplete="off"
              register={register("employerName")}
              error={errors.employerName}
            />
          )}

          <SelectInput
            id="loanPurpose"
            label="Loan purpose"
            type="text"
            name="loanPurpose"
            autoComplete="off"
            options={[
              {
                id: "vehicle",
                value: "Vehicle",
              },
              {
                id: "homeImprovement",
                value: "Home Improvement",
              },
              {
                id: "personalUse",
                value: "Personal Use",
              },
            ]}
            register={register("loanPurpose")}
            error={errors.loanPurpose}
            isLoading={false}
          />

          <TextInput
            id="loanAmount"
            label="Loan amount"
            placeholder="Place your loan amount"
            type="number"
            name="loanAmount"
            autoComplete="off"
            register={register("loanAmount", { valueAsNumber: true })}
            error={errors.loanAmount}
          />

          <TextInput
            id="loanDeposit"
            label="Loan Deposit"
            placeholder="Place your loan deposit"
            type="number"
            name="loanDeposit"
            autoComplete="off"
            register={register("loanDeposit", { valueAsNumber: true })}
            error={errors.loanDeposit}
          />

          <TextInput
            id="loanTerm"
            label="Loan Term (years)"
            placeholder="Place your loan term (years)"
            type="number"
            name="loanTerm"
            autoComplete="off"
            register={register("loanTerm", { valueAsNumber: true })}
            error={errors.loanTerm}
          />
        </div>
      </Form.Section>
      <Form.Section>
        <div className="flex flex-row-reverse">
          <Button
            type="submit"
            className={isIdle === false ? "cursor-not-allowed opacity-50" : ""}
          >
            Submit
          </Button>
        </div>
      </Form.Section>
    </Form>
  );
};

export default ApplyLoanPage;
