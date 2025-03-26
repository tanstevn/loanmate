import { HTMLAttributes, PropsWithChildren } from "react";
import { UseFormHandleSubmit } from "react-hook-form";

interface FormProps extends PropsWithChildren<HTMLAttributes<HTMLFormElement>> {
  onSubmit: ReturnType<UseFormHandleSubmit<any>>;
}

interface FormHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

interface FormSectionProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

const FormRoot = ({ onSubmit, children, ...props }: FormProps) => {
  return (
    <form onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};

const FormHeader = ({ title, description, ...props }: FormHeaderProps) => {
  return (
    <div {...props}>
      <h2 className="text-base font-semibold leading-7 text-white">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-400">{description}</p>
    </div>
  );
};

const FormSection = ({ children, ...props }: FormSectionProps) => {
  return (
    <div className="pb-6" {...props}>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols6">
        {children}
      </div>
    </div>
  );
};

export let Form = Object.assign(FormRoot, {
  Header: FormHeader,
  Section: FormSection,
});
