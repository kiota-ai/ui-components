/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, FC } from 'react'
import { useTranslation } from 'react-i18next'
import Close from '../../../../assets/images/cross_blue.svg'
import Tick from '../../../../assets/images/tick_blue.svg'
import { Button } from '../atoms/Button'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  showCloseModal?: boolean;
  showModal: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  width?: string;
  height?: string;
  paddingBottom?: string;
  paddingTop?: string;
  px?: string;
  fixedWidth?: string;
  closeOnClickOutside?: boolean;
}

export default ModalProps;


export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  showCloseModal,
  showModal,
  setShowModal,
  width = 'full',
  height = 'auto',
  paddingBottom = '8',
  paddingTop = '10',
  px = '8',
  fixedWidth,
  closeOnClickOutside = false
}) => {
  const wrapperRef = useRef(null)

  const handleClickOutside = (event:Event) => {
    const { current: wrap } = wrapperRef as any
    if (closeOnClickOutside && wrap && !wrap.contains(event.target)) {
      onClose && onClose()
      setShowModal && setShowModal(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeOnClickOutside])

  if (!showModal) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="h-full w-full | top-0 left-0 bottom-0 fixed z-50 | bg-gray-opacity | flex justify-center items-center">
      <div ref={wrapperRef} className={`${fixedWidth} relative`}>
        <div className={`max-h-screen rounded-2xl shadow-md px-${px} pb-${paddingBottom} pt-${paddingTop} w-${width} h-${height} sm:m-0 bg-white`}>
          <div className="relative top-4 right-4 | flex justify-end">
            {showCloseModal && (
              <button
                type="button"
                onClick={onClose}
                className={`p-2 rounded-full  absolute -top-9 -right-8  border border-border-buttons-secondary`}
              >
                <FaTimes className={`block w-6 text-2xl text-text-buttons-secondary`} />
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
    , document.body)
}

export interface ModalSwalProps {
  title: string;
  titleColor?: string;
  text: string;
  textMargin?: string;
  textWidth?: string;
  onClick: () => void;
  img?: string; 
  bgColor?: string;
  textColor?: string;
  width?: string;
  widtMovile?: string;
  height?: string;
  heightMovile?: string;
  padding?: string;
  exit?: boolean;
  link?: string | null;
  showIcon?: boolean;
  action?: any;
  actionText?: string;
}



export const ModalSwal: FC<ModalSwalProps> = ({
  title,
  titleColor = 'blue-dark',
  text,
  textMargin = '4',
  textWidth = 'medium',
  onClick,
  img = Tick,
  bgColor = 'white',
  textColor = 'blue-dark',
  width = '96',
  widtMovile = '80',
  height = '96',
  heightMovile = '80',
  padding = '4',
  exit = false,
  link = null,
  showIcon = true,
  action = false,
  actionText = ''
}) => {
  const logout = () => { }

  const { t } = useTranslation()

  return (
    <div className="h-full w-full | top-0 left-0 absolute z-50 | bg-gray-opacity | flex justify-center items-center">
      <div className={`bg-${bgColor} rounded-lg shadow-md | w-${widtMovile} h-${heightMovile} sm:w-${width} sm:h-${height} p-${padding}`}>
        <div className="relative top-0 right-0 | flex justify-end | cursor-pointer">
          {onClick && (
            <button
              type="button"
              onClick={onClick}
              className={
                'shadow-hover hover:shadow-inner p-2 rounded-2xl bg-transparence-blue'
              }
            >
              <img src={Close} alt="Close icon" className="block w-4" />
            </button>
          )}
        </div>
        <div className="w-full h-full p-8 | flex flex-col justify-center items-center">
          {showIcon && <img src={img} alt="Tic icon" className={'w-16'} />}
          {title && (
            <h3 className={`text-center text-lg font-medium mb-1 mt-6 text-${titleColor}`}>
              {title}
            </h3>
          )}
          <p className={`text-${textColor} text-center text-sm font-${textWidth} mt-${textMargin}`}>
            {text}
          </p>
          {link && (
            <div className={'flex text-xs text-gray mt-4'}>
              {t('kiota_express_requirements')}&nbsp;
              <Link to={link} className="underline">
                {t('here')}
              </Link>
            </div>
          )}
          {exit && (
            <Button
              text={t('exit')}
              width="auto"
              onClick={logout}
              textColor={`blue-dark`}
              shadow="none"
            />
          )}
          {action && (
            <Button
              text={actionText}
              width="auto"
              onClick={() => action()}
              textColor={`blue-dark`}
              shadow="none"
            />
          )}
        </div>
      </div>
    </div>
  )
}
