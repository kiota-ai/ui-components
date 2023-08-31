/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import { Tooltip } from '../atoms/Tooltip'

interface CheckboxProps {
  name?: string;
  id?: string;
  reference?: React.Ref<HTMLInputElement>;
  label?: string;
  error?: any;
  checked?: boolean;
  onChange?: any;
  onClick?: any;
  value?: string;
  disabled?: boolean;
  help?: string;
  dataFor?: string;
  children?: React.ReactNode;
  width?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  name,
  id,
  reference,
  label,
  error,
  checked,
  onChange,
  onClick,
  value,
  disabled,
  help,
  dataFor,
  children,
  width = 'full'
}) => {
  return (
    <div className={`flex flex-col | w-${width} | my-2 mx-0`}>
      <div>
        <input
          {...reference}
          className={`form-checkbox rounded-sm cursor-pointer hover:shadow-inner bg-main border border-gray-lines text-main ${
            checked ? 'shadow-inner' : 'shadow-soft-white'
          }`}
          type="checkbox"
          name={name}
          id={id}
          checked={checked}
          onChange={onChange}
          onClick={onClick}
          value={value}
          disabled={disabled}
        />

        <label className="ml-2 mb-0 text-xs cursor-pointer" htmlFor={id}>
          {label} {help && <Tooltip dataFor={dataFor} children={children} />}
        </label>
      </div>
      {error && (
        <div className="text-red -top-3 left-2 text-xxs">{error.message}</div>
      )}
    </div>
  )
}
