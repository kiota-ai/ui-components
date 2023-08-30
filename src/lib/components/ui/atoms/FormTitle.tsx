import { FC } from "react";

interface FormProps {
  formTitle:string;
  formSubtitle:string;
}

export const FormTitle: FC<FormProps> = ({formTitle,formSubtitle}) => {
  return (
    <div className="block mb-4 sm:mb-12 sm:px-0 mt-20 lg:mt-0">
      <h1 className={`text-main`}>{formTitle}</h1>
      <h5 className={`text-secondary font-semibold`}>{formSubtitle}</h5>
    </div>
  )
}
