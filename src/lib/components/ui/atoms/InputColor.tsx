/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

export interface InputColorProps {
  reference:any;
  label:any,
  error:any,
  onChange:any,
}

export const InputColor:FC<InputColorProps> = ({
  reference,
  label,
  error,
  onChange,
  ...inputProps
}) => {
  return (
    <div>
      <div className="text-xs font-medium text-black">
        {label}
      </div>
      <div className="flex inline-block mt-2 rounded-lg overflow-hidden w-32 h-8 border border-black">
        <input
          onChange={(e:any) => onChange ?  onChange(e.target.value): {}}
          type="color"
          {...reference}
          className="border-0 bg-none appearance-none p-0 w-full h-full cursor-pointer"
          {...inputProps}
        />
      </div>
      {error && (
        <div className="text-red relative text-xs">{error.message}</div>
      )}
    </div>
  )
}
