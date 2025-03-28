import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const TextInput = ({
  id,
  label,
  placeholder,
  register,
  error,
  ...props
}: Props) => {
  return (
    <div className="sm:col-span-4">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset">
          <input
            id={id}
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
            {...register}
            {...props}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-t1">{error.message}</p>}
      </div>
    </div>
  );
};

export default TextInput;
