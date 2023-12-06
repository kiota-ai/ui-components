import { FC } from "react";

export interface ButtonTextProps {
  text?: string;
}
export const BottomText:FC<ButtonTextProps> = ({text}) => {
  return (
    <div className="sm:w-3/4 bottom-0 | pt-8 sm:pb-2 | text-center">
      <span className="block left-0 | text-gray font-normal text-xs">{text}</span>
    </div>
  )
}
