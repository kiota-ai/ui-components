/* eslint-disable @typescript-eslint/no-explicit-any */
import { PasswordRequirements } from './PasswordRequirements'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FC, useState } from 'react'

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  reference: React.Ref<HTMLInputElement>;
  error?: any;
  label?: string;
  placeholder?: string;
  type: string;
  maxLength?: number;
  required?: boolean;
  className?: string;
  labelClassName?: string;
}


export const Input: FC<InputFieldProps> = ({
  reference,
  error,
  label,
  placeholder,
  type,
  maxLength = 255,
  required = false,
  className= "shadow-soft-white  bg-input w-full py-3 px-7 mb-2 sm:mb-5 relative z-10 text-left text-xs font-normal rounded-2xl placeholder-gray cursor-pointer transition-all duration-200",
  labelClassName="font-medium",
  ...inputProps
}) => {
  const [internalType, setInternalType] = useState(type || 'text')
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={label}
          className={`block mb-1 text-left text-xs flex ${labelClassName}`}
        >
          {label}&nbsp;
          {required && (
            <span className="text-red inline-block mx-1">*</span>
          )}
        </label>
      )}

      <input
        {...reference}
        {...inputProps}
        type={internalType}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        className={`border border-gray-lines focus:border-main bg-input w-full py-3 px-7 mb-2 sm:mb-5 relative z-10 text-left text-xs font-normal rounded-2xl placeholder-gray cursor-pointer transition-all duration-200 outline-none hover:border-main ${className}`}
      />

      {type === 'password' && (
        <div className="relative flex justify-end mr-4 bottom-9 md:bottom-12">
          {internalType === 'password' && (
            <FaEye
              onClick={() => setInternalType('text')}
              className={`cursor-pointer text-main text-sm z-20`}
            />
          )}

          {internalType !== 'password' && (
            <FaEyeSlash
              onClick={() => setInternalType('password')}
              className={`cursor-pointer text-main text-sm z-20`}
            />
          )}
        </div>
      )}

      {error && (error?.password_register || error?.new_password) && (
        <PasswordRequirements errors={error} />
      )}

      {error && (
        <div className="text-red relative left-2 -top-3 text-xxs text-left">
          {error.message}
        </div>
      )}
    </div>
  )
}
