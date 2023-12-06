import { FC } from "react";


export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  id?: string;
  title: string;
  children: React.ReactNode;
  padding?: string;
  movilePadding?: string;
  marginX?: string;
  movileMarginX?: string;
  movileMarginY?: string;
  marginY?: string;
  marginYB?: string;
  width?: string;
  rounded?: string;
  startupsList?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  wrapperClassName?: string;
  containerClassName?: string;
  bgColor?: string;
}
export const Card: FC<CardProps> = ({
  id,
  title,
  children,
  padding = '10',
  movilePadding = '4',
  marginX = '0',
  movileMarginX = '0',
  movileMarginY = '0',
  marginY = '0',
  marginYB,
  width = 'full',
  rounded = '2xl',
  startupsList = false,
  clickable = false,
  onClick,
  wrapperClassName = '',
  containerClassName = '',
  bgColor = 'bg-white',
  ...inputProps
}) => {
  const classCard = `${containerClassName} rounded-${rounded} w-full p-${movilePadding} sm:p-${padding} ${(startupsList || clickable) && 'hover:shadow-inner'}`

  return (
    <div
      id={id}
      onClick={onClick}
      className={`
        ${wrapperClassName} ${bgColor} rounded-${rounded}
        w-${width} px-${movileMarginX} py-${movileMarginY} sm:px-${marginX} 
        sm:py-${marginY} pb-${marginYB} ${clickable && 'cursor-pointer'} 
      `}
    >
      <div className={classCard} {...inputProps}>
        {title && <h2 className="font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
