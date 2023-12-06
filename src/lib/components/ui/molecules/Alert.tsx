/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { FaExclamationTriangle, FaTimesCircle,FaInfoCircle } from 'react-icons/fa'

export interface AlertsProps {
  text:string;
  style: string;
  bgColor: string;
}

export const Alert:FC<AlertsProps> = ({ text, style, bgColor = 'bg-gray-100' }) => {
  const borderColor:any = {
    info: `border-border-alert-info`,
    warning: 'border-orange-400',
    error: 'border-red-400'
  }
  return (
    <div className={`border-l-4 ${borderColor[style]} ${bgColor} p-4 my-3 flex gap-4 items-center`}>
      {style === 'warning' && <FaExclamationTriangle className='text-orange-400 inline-block relative top-[2px]' />}
      {style === 'error' && <FaTimesCircle className='text-red-400 inline-block' />}
      {style === 'info' && <FaInfoCircle className={`text-text-alert-info inline-block`} />}
      {text}
    </div>
  )
}
