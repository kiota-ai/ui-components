import { FC } from "react";

interface IconButtonProps {
  onClick: () => void;
  bgColor?: string;
  width?: string;
  height?: string;
  shadow?: string;
  shadowHover?: string;
  icon?: string;
  iconWidth?: string;
  alt?: string;
  marginY?: string;
}


export const IconContainer: FC<IconButtonProps> = ({
  onClick,
  bgColor = 'transparence-blue',
  width = '9',
  height = '9',
  shadow,
  shadowHover,
  icon,
  iconWidth = '5',
  alt,
  marginY
}) => {
  return (
    <button
      onClick={onClick}
      className={
        `w-${width} h-${height} mx-1 my-${marginY} | 
        bg-${bgColor} rounded-2xl | 
        flex justify-center items-center | 
        cursor-pointer outline-none transition-all duration-500 ease-in-out shadow-${shadow} | 
        hover:shadow-${shadowHover} hover:outline-none`
      }
    >
      <img
        src={icon}
        alt={alt}
        className={`h-${iconWidth} w-auto`}
      />
    </button>
  )
}
