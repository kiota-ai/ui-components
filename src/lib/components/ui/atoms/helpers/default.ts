import { ClassesOptions } from '../interfaces'
export const generateClasses = ({
  textAlign,
  width,
  verticalMargin,
  marginRight,
  marginLeft,
  vertical,
  horizontal,
  textSize,
  weight,
  textColor,
  textColorHover,
  bgColor,
  bgHoverColor,
  borderColor,
  shadow,
  className
}: ClassesOptions): string => {
  const textAlignClass = textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';
  const borderClass = borderColor ? `border border-${borderColor}` : '';

  return `${textAlignClass} block w-${width} my-${verticalMargin} mr-${marginRight} ml-${marginLeft} py-${vertical} px-${horizontal} text-${textSize} font-${weight} text-${textColor} placeholder-gray bg-${bgColor} rounded-2xl shadow-${shadow} cursor-pointer transition-all duration-500 ease-in-out hover:bg-${bgHoverColor} hover:border-${borderColor} hover:text-${textColorHover} hover:shadow-hover focus:outline-none hover:shadow-inner ${borderClass} ${className}`;
};