import { FC } from "react";
export interface ButtonsProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  verticalMargin?: string;
  vertical?: string;
  horizontal?: string;
  marginRight?: string;
  marginLeft?: string;
  bgColor?: string;
  textColor?: string;
  bgHoverColor?: string;
  borderColor?: string;
  textColorHover?: string;
  icon?: string;
  iconComponent?: React.ReactNode;
  text?: string;
  disabled?: boolean;
  textSize?: string;
  weight?: string;
  shadow?: string;
  iconWidth?: string;
  textAlign?: string;
  className?: string;
}

export const Button: FC<ButtonsProps> = ({
  onClick,
  type,
  width = 'full',
  verticalMargin = '5',
  vertical = '2.5',
  horizontal = '7',
  marginRight = '0',
  marginLeft = '0',
  bgColor = 'transparence-blue',
  textColor = 'blue-dark',
  bgHoverColor,
  borderColor,
  textColorHover,
  icon,
  iconComponent,
  text,
  disabled,
  textSize = 'sm',
  weight = 'semibold',
  shadow = 'soft-white',
  iconWidth = 'auto',
  textAlign = 'center',
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={
        `${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'} 
        block w-${width} my-${verticalMargin} mr-${marginRight} ml-${marginLeft} py-${vertical} px-${horizontal} 
        text-${textSize} font-${weight} text-${textColor} placeholder-gray bg-${bgColor} rounded-2xl 
        shadow-${shadow} cursor-pointer transition-all duration-500 ease-in-out 
        hover:bg-${bgHoverColor} hover:border-${borderColor} hover:text-${textColorHover} hover:shadow-hover
        ${borderColor && `border border-${borderColor}`}
        focus:outline-none hover:shadow-inner ${className}`
      }
    >
      {icon && (
        <img src={icon} alt="Icon" className={`inline | mr-2 | w-${iconWidth} `} />
      )}

      {iconComponent && iconComponent}

      {text}
    </button>
  )
}
