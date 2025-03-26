"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "You must be at least 18"),
});

type FormData = z.infer<typeof schema>;

const LoanForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name:</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Last Name:</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email Address:</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Employment Status:</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
        <label>Employer Name:</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Loan Purpose:</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Loan Amount:</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Loan Deposit:</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Loan Term:</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoanForm;
