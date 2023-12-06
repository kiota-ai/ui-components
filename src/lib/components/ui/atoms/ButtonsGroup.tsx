/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactTooltip from 'react-tooltip'
import { FC, useEffect } from 'react'

export interface ButtonsGroupProps {
  options: any[];
  className: string;
}

export const ButtonsGroup:FC<ButtonsGroupProps> = ({ options = [], className = '' }) => {
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [options])

  return (
    <div className={`w-full flex flex-row ${className}`}>
      {options.map((option, i) => (
        <div
          key={i}
          data-tip={option.label}
          onClick={() => option.onClick()}
          className={`
              leading-none
              flex-1 
              text-center 
              hover:shadow-inner 
              hover:opacity-80
              transition-all ease-in-out duration-200
              cursor-pointer 
              py-2 
              ${i === 0 ? 'rounded-l-2xl' : ''}
              ${i === options.length - 1 ? 'rounded-r-2xl' : ''}
              ${i !== 0 && i !== options.length - 1 ? 'border-r border-l' : ''} 
              ${option.className ? option.className : ''}
            `}
        >
          {option.icon}
        </div>
      ))}
    </div>
  )
}
