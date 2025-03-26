import { useEffect } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: SelectOption[] | undefined;
  register: UseFormRegisterReturn;
  error?: FieldError;
  isLoading: boolean;
}

export interface SelectOption {
  id: string;
  value: string;
}

const SelectInput = ({
  id,
  label,
  options,
  register,
  error,
  isLoading,
  ...props
}: InputProps) => {
  useEffect(() => {
    if (isLoading === false && props.value === "") {
      props.onChange?.({ target: { value: options?.[0].id } } as any);
    }
  }, [props, options, isLoading]);

  return (
    <div className="sm:col-span-4">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          id={id}
          className="block w-full rounded-md border-0 bg-white/5 pl-1 py-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 [&_*]:text-black"
          {...register}
          {...props}
        >
          {!isLoading &&
            options?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          {isLoading && <option>Loading...</option>}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    </div>
  );
};

export default SelectInput;
