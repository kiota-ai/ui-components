/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Arrow, useLayer } from 'react-laag'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'

export interface PopoverMenuProps {
  onClick:any,
  items: any[],
}

export const PopoverMenu:FC<PopoverMenuProps> = ({onClick,items}) => {
  const { t } = useTranslation()
  const [isOpen, setOpen] = useState(false)



  const handleRedirect = (url:string) => {
    setOpen(false)
    onClick(url)
  }

  const handleMethod = (method:any) => {
    setOpen(false)
    method()
  }

  const handleLogout = () => {
    localStorage.clear()
    onClick('/')
  }

  const getMenuItems = () => {
    return [...items,
      {
        title: 'logout',
        icon: <FaSignOutAlt />,
        investor: true,
        founder: true,
        admin: true,
        method: () => handleLogout()
      }
    ]
  }

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: () => setOpen(false),
    onDisappear: () => setOpen(false),
    overflowContainer: true,
    auto: true,
    placement: 'bottom-center',
    triggerOffset: 12,
    containerOffset: 16,
    arrowOffset: 16
  })

  return (
    <>
      <button
        id={'account-button'}
        {...triggerProps}
        onClick={() => setOpen(!isOpen)}
        className={`bg-bg-buttons-secondary border border-border-buttons-secondary focus:outline-none custom-circle hover:shadow-inner shadow-soft-white w-12 h-12 rounded-full ml-2`}
      >
        <div className='flex justify-center'>

          <FaUser />
        </div>
      </button>

      {isOpen &&
        renderLayer(
          <ul
            {...layerProps}
            className={`mt-2 px-2 py-2 z-30 | shadow-hover border bg-white rounded-2xl border-border-buttons-secondary`}
          >
            {getMenuItems().map((i:any, index:number) => (
              <li
                key={index}
                onClick={() =>
                  i.method ? handleMethod(i.method) : handleRedirect(i.url)
                }
                className={`px-2 py-2 flex text-main items-center cursor-pointer text-sm text-gray`}
              >
                <span className={`mr-2 text-main`}>{i.icon}</span>
                <span className='hover:font-bold'>{t(i.title)}</span>
              </li>
            ))}
            <Arrow
              {...arrowProps}
              borderColor="#61D8BD"
              borderWidth={1}
              className={'w-5'}
            />
          </ul>
        )}
    </>
  )
}
