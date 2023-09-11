/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line react-refresh/only-export-components

import { FC, useEffect, useState } from 'react'
import ArrowDown from '../../../../assets/images/arrow_black_down.svg'
import ArrowUp from '../../../../assets/images/arrow_black_up.svg'
import Tick from '../../../../assets/images/tick.svg'
import Sort from '../../../../assets/images/sort_arrows.svg'
import { useTranslation } from 'react-i18next'
import { FaTimes } from 'react-icons/fa'



interface SelectProps {
  label?: string;
  placeholder?: string;
  name?: string;
  reset?: boolean;
  setReset?: React.Dispatch<React.SetStateAction<boolean>>;
  items?: Array<{
    id: number;
    value: string;
    image?: React.ReactNode;
    disabled?: boolean;
  }>;
  multiSelect?: boolean;
  error?: {
    message: string;
  } | null;
  initialValues?: any;
  onSelect?: any;
  sort?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  isClearable?: boolean;
  showQuantity?: boolean;
  noOptionsText?: string;
}


export const Select:FC<SelectProps> = ({
  label,
  placeholder,
  reset = false,
  setReset,
  items = [],
  multiSelect = false,
  error,
  initialValues = [],
  onSelect,
  sort,
  required = false,
  className = 'shadow-soft-white hover:border-main hover:outline-none hover:shadow-focus focus:outline-none focus:shadow-focus active:outline-none active:shadow-focus',
  disabled = false,
  isClearable = true,
  showQuantity = true,
  noOptionsText
}) => {

  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState(initialValues)

  const handleOnClick = (item:any) => {
    let selectedOptions:any = []

    if (!selection.some((current:any) => current.id === item.id)) {
      if (!multiSelect) {
        selectedOptions = [item]
      } else if (multiSelect) {
        selectedOptions = [...selection, item]
      }
    } else {
      let selectionAfterRemoval = selection

      if (selectionAfterRemoval.length === 1 && !multiSelect) {
        return
      }

      selectionAfterRemoval = selectionAfterRemoval.filter((current:any) => current.id !== item.id)
      selectedOptions = [...selectionAfterRemoval]
    }

    setSelection(selectedOptions)

    if (onSelect) {
      onSelect(selectedOptions)
    }

    if (!multiSelect) {
      setOpen(!open)
    }
  }

  const isItemInSelection = (item:any) => selection.some((current:any) => current.id === item.id)

  const resetSelection = () => {
    setSelection([])
    if (onSelect) {
      onSelect([])
    }
  }

  const haveSelection = () => selection?.length > 0

  const mustReplaceSelectionFromInitialValues = () => {
    // you must use reset and setReset to reset the selection
    if (initialValues.length === 0) {
      return false
    }

    if (selection?.length !== initialValues.length) {
      return true
    } else {
      for (let i = 0; i < selection?.length; i++) {
        if (selection[i].id !== initialValues[i].id) {
          return true
        }
      }
    }

    return false
  }

  const getPlaceholder = () => {
    if (placeholder && placeholder !== '') {
      return <span className="text-placeholder-gray">{placeholder}</span>
    }

    return (
      <span className="text-placeholder-gray">
        {t(multiSelect ? 'select_multi_default_placeholder' : 'select_default_placeholder')}
      </span>
    )
  }

  useEffect(() => {
    if (reset) {
      resetSelection()
      setReset && setReset(false)
    }
  }, [reset])

  useEffect(() => {
    if (initialValues.length) {
      if (mustReplaceSelectionFromInitialValues()) {
        setSelection(initialValues)
      }
    } else {
      setSelection(initialValues)
    }
  }, [initialValues])

  return (
    <div>
      <div
        className={'mb-2 sm:mb-5 sm:w-auto outline:none focus:outline-none'}
        onClick={() => !disabled && setOpen(!open)}
      >
        <label className="block mb-1 text-left text-xs font-medium text-black">
          {label}
          {required && <span className="text-red">&nbsp;*</span>}
          {multiSelect && showQuantity && haveSelection() && <span>&nbsp;({selection?.length})</span>}
          {(haveSelection() && isClearable) && (
            <span
              data-tip={t('reset')}
              className={`hover:underline text-main relative -top-[1px]`}
              onClick={e => {
                e.stopPropagation()
                resetSelection()
              }}
            >
              <FaTimes className="cursor-pointer inline-block ml-1" />
            </span>
          )}
        </label>

        <div
          className={
            `border border-gray-lines bg-white w-full py-2 sm:py-3 px-7 relative z-1s0 text-left text-xs 
            font-normal rounded-2xl placeholder-gray ${!disabled && className} cursor-pointer transition-all  
            duration-500 outline-none ${disabled && 'shadow-inner'} ${open && 'shadow-inner'}`
          }
        >
          <div>
            {open && (
              <>
                {sort && (
                  <>
                    <div className="flex justify-between items-center bg-white">
                      <div className="flex">
                        <img src={Sort} alt="Arrow down" className="w-4 mr-1" />
                        <p className='text-xs hidden sm:block'>
                          {multiSelect ? getPlaceholder() : selection?.length ? selection[0]?.value : getPlaceholder()}
                        </p>
                      </div>
                      <img src={ArrowUp} alt="Arrow up" className="pl-8" />
                    </div>
                  </>
                )}

                {!sort && (
                  <>
                    <div className="flex justify-between items-center bg-white">
                      <div className="flex text-xs">
                        {!multiSelect && selection?.length > 0 && selection[0].image && (
                          <span className="mr-2">{selection[0].image}</span>
                        )}
                        <span>
                          {multiSelect ? getPlaceholder() : selection?.length ? selection[0]?.value : getPlaceholder()}
                        </span>
                      </div>
                      <img src={ArrowUp} alt="Arrow up" className="pl-8" />
                    </div>
                  </>
                )}
              </>
            )}

            {!open && (
              <div className="flex justify-between bg-white">
                {sort
                  ? (
                    <>
                      <div className="flex">
                        <img src={Sort} alt="Arrow down" className="w-4 mr-1" />
                        <p className="text-xs hidden sm:block">
                          {multiSelect ? getPlaceholder() : selection?.length ? selection[0]?.value : getPlaceholder()}
                        </p>
                      </div>
                      <img src={ArrowDown} alt="Arrow down" className="pl-8" />
                    </>
                  )
                  : (
                    <>
                      <div className="flex text-xs bg-white">
                        <span>
                          {multiSelect ? getPlaceholder() : selection?.length ? selection[0]?.value : getPlaceholder()}
                        </span>
                      </div>

                      <img src={ArrowDown} alt="Arrow down" className="pl-8" />
                    </>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative w-full bg-white">
        {open && (
          <ul
            className={
              `max-h-60 overflow-y-auto bg-white w-full 
              border border-gray-lines -mt-4 mb-4 py-2 sm:py-3 px-4 absolute z-20 
              text-left text-xs font-normal rounded-xl placeholder-gray shadow-soft-white 
              cursor-pointer transition-all duration-200 outline-none hover:outline-none 
              focus:outline-none focus:shadow-focus active:outline-none shadow-hover`
            }
          >
            {!items.length && (
              <li className="py-1 px-3">
                <span className="text-gray">{noOptionsText || t('no_options')}</span>
              </li>
            )}

            {items.map((item) => (
              <li
                key={item.id}
                className={
                  `py-1 border-b hover:text-main 
                  ${item.disabled ? 'bg-white' : null} 
                  ${isItemInSelection(item) ? `text-main` : null}`
                }
              >
                {item.disabled && <span className="text-gray">{item.value}</span>}
                {!item.disabled && (
                  <button
                    type="button"
                    onClick={() => (item.disabled ? null : handleOnClick(item))}
                    className="w-full bg-white flex items-center gap-3 text-left outline:none focus:outline-none"
                  >
                    <span className='w-2'>
                      {isItemInSelection(item) && (
                        <img src={Tick} alt="Tick icon" />
                      )}
                    </span>
                    <div className="flex">
                      {item.image && <span className="mr-2">{item.image}</span>}
                      <span>{item.value}</span>
                    </div>
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <div className="text-red relative -top-3 left-2 text-xxs">
          {error.message}
        </div>
      )}
    </div>
  )
}



