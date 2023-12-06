/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLayer } from 'react-laag'
import Points from '../../../../assets/images/points_gray.svg'

export interface PopoverBoardsProps {
  methods: any;
  items: any[];
}

export const PopoverBoards: FC<PopoverBoardsProps> = ({ methods, items }) => {
  const [isOpen, setOpen] = React.useState(false)

  function close() {
    setOpen(false)
  }

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: close,
    onDisappear: close,
    overflowContainer: true,
    auto: true,
    placement: 'bottom-start',
    triggerOffset: 12,
    containerOffset: 16,
    arrowOffset: 16
  })

  const { t } = useTranslation()

  return (
    <>
      <button
        {...triggerProps}
        onClick={(event) => {
          event.stopPropagation()
          setOpen(!isOpen)
        }}
        className={`w-6 focus:outline-none flex border border-border-buttons-secondary text-text-buttons-secondary shadow-soft-white rounded-xl  px-1 pb-2 hover:shadow-inner`}
      >
        <img src={Points} alt="Arrow up" className="w-4 text-black " />
      </button>
      {renderLayer(
        <div>
          {isOpen && (
            <ul
              {...layerProps}
              className={`mt-2 px-2 py-2 z-30 | shadow-hover border bg-white rounded-2xl border-border-buttons-secondary`}
            >
              {items.map((i:any, index:any) => {
                return (
                  <li
                    key={index}
                    onClick={(event) => {
                      setOpen(false)
                      event.stopPropagation()
                      methods[i]()
                    }}
                    className={`px-2 py-2 flex text-main items-center cursor-pointer text-xs text-gray`}
                  >
                    <span className='hover:font-bold'>{t(i)}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </>
  )
}
