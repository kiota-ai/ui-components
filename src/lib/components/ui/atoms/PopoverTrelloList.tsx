/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayer } from 'react-laag'
import { FC,useState } from 'react'
import Dots from '../../../../assets/images/points_gray.svg'
import { useTranslation } from 'react-i18next'

export interface PopoverTrelloListProps {
  methods: any;
  items: any[];
}

export const PopoverTrelloList:FC<PopoverTrelloListProps> = ({ items, methods }) => {
  const [isOpen, setOpen] = useState(false)
  const { t } = useTranslation()

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

  return (
    <>
      <button
        {...triggerProps}
        onClick={() => setOpen(!isOpen)}
        className={`focus:outline-none border border-border-buttons-secondary rounded-full`}
      >
        {isOpen
          ? (
            <img src={Dots} alt="Arrow up" className="w-4 h-4 mb-2" />
          )
          : (
            <img src={Dots} alt="Arrow down" className="w-4 h-4 mb-2" />
          )}
      </button>
      {renderLayer(
        <div>
          {isOpen && (
            <ul
              {...layerProps}
              className={`pl-2 py-1 | bg-white shadow-hover rounded-2xl | text-gray text-xxs | w-auto border border-border-buttons-secondary`}
            >
              {items &&
                items.map((i, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => methods[i]()}
                      className={`px-2 py-1 flex cursor-pointer hover:text-main hover:font-bold text-main`}
                    >
                      <span>{t(i)}</span>
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
