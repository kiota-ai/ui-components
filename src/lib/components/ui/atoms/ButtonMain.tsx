import { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  marginRight?: string;
  marginLeft?: string;
  icon?: string;
  iconComponent?: React.ReactNode;
  text?: string;
  disabled?: boolean;
  width?: string;
  paddingVertical?: string;
}


export const ButtonMain: FC<ButtonProps> = ({
  onClick,
  type,
  marginRight = '0',
  marginLeft = '0',
  icon,
  iconComponent,
  text,
  disabled,
  width = 'auto',
  paddingVertical = '0'
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={
        `text-center block w-${width} py-${paddingVertical} mr-${marginRight} ml-${marginLeft} py-2 px-4
          text-xs font-semibold text-text-buttons-main placeholder-gray bg-bg-buttons-main rounded-2xl 
          shadow-soft-white cursor-pointer transition-all duration-500 ease-in-out 
          hover:bg-buttons-main-hover hover:text-buttons-main hover:shadow-hover
          focus:outline-none hover:shadow-inner`
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
