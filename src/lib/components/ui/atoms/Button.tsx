import { FC } from 'react'

import { ButtonInterface } from './interfaces'
import { generateClasses } from './helpers/default'
import '../../../index.css'
export const Button: FC<ButtonInterface> = (props) => {

  const {
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
  } = props 
  
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={generateClasses({
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
      })}
    >
      {icon && (
        <img src={icon} alt="Icon" className={`inline | mr-2 | w-${iconWidth} `} />
      )}

      {iconComponent && iconComponent}

      {text}
    </button>
  )
}
