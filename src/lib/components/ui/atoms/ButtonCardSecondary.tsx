import { FC } from "react";

export interface ButtonCardSecondaryProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  marginRight?: string;
  marginLeft?: string;
  icon?: string;
  iconComponent?: React.ReactNode;
  text?: string;
  disabled?: boolean;
}

export const ButtonCardSecondary: FC<ButtonCardSecondaryProps> = ({
  onClick,
  type,
  marginRight = '0',
  marginLeft = '0',
  icon,
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
        `text-center block w-auto mr-${marginRight} ml-${marginLeft} py-2 px-4
          text-xs font-semibold text-text-buttons-card-secondary placeholder-gray bg-bg-buttons-card-secondary rounded-2xl 
          shadow-soft-white cursor-pointer transition-all duration-500 ease-in-out 
          border border-border-buttons-card-secondary
          hover:bg-bg-buttons-card-secondary-hover hover:text-text-buttons-card-secondary hover:shadow-hover
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
