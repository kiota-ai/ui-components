import { FC } from "react";

export interface FormProps {
  formTitle:string;
  formSubtitle:string;
  titleClass: string;
}

export const FormTitle: FC<FormProps> = ({formTitle,formSubtitle,titleClass}) => {
  return (
    <div className="block mb-4 sm:mb-12 sm:px-0 mt-20 lg:mt-0">
      <h1 className={`text-main ${titleClass}`}>{formTitle}</h1>
      <h5 className={`text-secondary font-semibold`}>{formSubtitle}</h5>
    </div>
  )
}
