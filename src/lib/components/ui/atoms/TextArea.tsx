/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC } from "react";

export interface InputProps {
  reference?: React.RefObject<any>;
  error?: any;
  label: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
  className?: string;
  labelClassName?: string;
}

export const TextArea:FC<InputProps> = ({
  reference,
  error,
  label,
  placeholder,
  rows = 4,
  required = false,
  className = 'cursor-pointer transition-all duration-200 outline-none hover:border-main hover:outline-none focus:outline-none focus:shadow-focus active:outline-none resize-none',
  labelClassName="font-medium",
  ...inputProps
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={label}
        className={`block mb-1 text-left text-xs  text-black flex ${labelClassName}`}
      >
        {label} {required && <span className="text-red inline-block mx-1">*</span>}
      </label>

      <textarea
        {...reference}
        {...inputProps}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className={`border border-gray-lines bg-white w-full h-auto py-3 px-7 text-left text-xs font-normal rounded-lg placeholder-gray ${className}`}
      />

      {error && (
        <div className="text-red relative text-xs">{error.message}</div>
      )}
    </div>
  )
}
