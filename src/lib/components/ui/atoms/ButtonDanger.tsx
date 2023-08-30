import { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  marginRight?: string;
  marginLeft?: string;
  marginTop?: string;
  width?: string;
  icon?: string;
  iconComponent?: React.ReactNode;
  text?: string;
  disabled?: boolean;
}
export const ButtonDanger: FC<ButtonProps> = ({
  onClick,
  type,
  marginRight = '0',
  marginLeft = '0',
  marginTop = '0',
  icon,
  width = 'auto',
  iconComponent,
  text,
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={
        `text-center block w-${width} mr-${marginRight} ml-${marginLeft} py-2 px-4 mt-${marginTop}
          text-xs font-semibold text-red placeholder-gray border-red rounded-2xl 
          shadow-soft-white cursor-pointer transition-all duration-500 ease-in-out border 
          hover:shadow-hover focus:outline-none hover:shadow-inner`
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
