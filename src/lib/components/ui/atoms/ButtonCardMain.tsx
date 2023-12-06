import { FC } from "react";

export interface ButtonCardMainProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  marginRight?: string;
  marginLeft?: string;
  icon?: string;
  iconComponent?: React.ReactNode;
  text?: string;
  className?: string;
  disabled?: boolean;
}
export const ButtonCardMain: FC<ButtonCardMainProps> = ({
  onClick,
  type,
  marginRight = '0',
  marginLeft = '0',
  icon,
  iconComponent,
  text,
  disabled,
  className='font-semibold'
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={
        `text-center block w-auto mr-${marginRight} ml-${marginLeft} py-2 px-4
          text-xs  text-text-buttons-card-main placeholder-gray bg-bg-buttons-card-main rounded-2xl 
          shadow-soft-white cursor-pointer transition-all duration-500 ease-in-out 
          hover:bg-buttons-card-main-hover hover:text-text-buttons-card-main hover:shadow-hover
          focus:outline-none hover:shadow-inner ${className}`
      }
    >
      {icon && (
        <img src={icon} alt="Icon" className={'inline | mr-2 | w-auto'} />
      )}
      {iconComponent && iconComponent}
      {text}
    </button>
  )
}
