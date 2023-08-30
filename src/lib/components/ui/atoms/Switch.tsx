/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'

interface CheckboxProps {
  onChange: (event: any) => void;
  checked: boolean;
  text: string;
  error?: any;
  size?: 'sm' | 'md' | 'lg';
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  tooltip?: boolean;
  disabled?: boolean;
}

export const Switch:FC<CheckboxProps> = ({
  onChange,
  checked,
  text,
  error,
  size = 'md',
  textSize = 'sm',
  tooltip = false,
  disabled = false
}) => {
  const [wrapperSizeClass, setWrapperSizeClass] = useState('')
  const [dotSizeClass, setDotSizeClass] = useState('')
  const [isChecked, setIsChecked] = useState(checked)
  const didMount = useRef(false)

  const handleClick = () => {
    if(!disabled) {
      setIsChecked(!isChecked)
    }
  }

  useEffect(() => {
    switch (size) {
      case 'sm':
        setWrapperSizeClass('w-8 h-4')
        setDotSizeClass('w-2 h-2')
        break
      case 'md':
        setWrapperSizeClass('w-10 h-5')
        setDotSizeClass('w-3 h-3')
        break
      case 'lg':
        setWrapperSizeClass('w-12 h-6')
        setDotSizeClass('w-4 h-4')
    }
  }, [size])

  useEffect(() => {
    if (didMount.current) {
      onChange && onChange(isChecked)
    } else {
      didMount.current = true
    }
  }, [isChecked])

  useEffect(() => {
    if (checked !== isChecked) {
      setIsChecked(checked)
    }
  }, [checked])

  return (
    <>
      <div className="flex items-center">
        <label
          className={`flex items-center ${!disabled && 'cursor-pointer'}`}
          onClick={handleClick}
        >
          <div className="relative">
            <div
              className={`${isChecked ? `bg-main` : 'bg-gray-light'
                } ${wrapperSizeClass} rounded-full shadow-inner`}
            />
            <div
              className={`${isChecked ? 'translate-x-[120%]' : ''
                } absolute ${dotSizeClass} bg-transparence-blue shadow-inner rounded-full shadow-switch left-2 top-1 transition`}
            />
          </div>
          {!tooltip && (
            <div className={`ml-3 text-${textSize}`}>
              {text}
            </div>
          )}
          {tooltip && (
            <div className={`ml-3 text-${textSize}`} data-tip={tooltip}>
              {text}
              {tooltip && <FaInfoCircle className='inline ml-1 w-4 h-4' />}
            </div>
          )}
        </label>
      </div>

      {error && <div className="text-red text-xs">{error.message}</div>}
    </>
  )
}
