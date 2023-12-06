import { FC, ReactNode } from "react";

export interface NoDataInfoProps {
  image: ReactNode | string;
  title: string;
  textOne: string;
  textTwo: string;
  backgroundImage: string;
  showExtraTextOnHover?: boolean;
  className?: string;
}


export const NoDataInfo: FC<NoDataInfoProps> = ({ image, title, textOne, textTwo, backgroundImage, showExtraTextOnHover = false, className = '' }) => {
  return (
    <div
      className={`w-full group h-full flex justify-center items-center ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="text-gray text-center ">
        {image}
        <h3 className='mb-4'>{title}</h3>
        <p className={`text-base mb-2 ${showExtraTextOnHover && 'hidden group-hover:block duration-300'}`}>{textOne}</p>
        <p className={`text-base ${showExtraTextOnHover && 'hidden group-hover:block duration-300'}`}>{textTwo}</p>
      </div>
    </div>
  )
}
