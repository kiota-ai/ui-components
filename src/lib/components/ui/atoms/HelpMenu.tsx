/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Arrow, useLayer } from 'react-laag'
import { BiSupport } from 'react-icons/bi'
import { BsBook, BsStar} from 'react-icons/bs'
import { IoHelpOutline } from 'react-icons/io5'
import {  VscFeedback } from 'react-icons/vsc'

export interface MenuHelpProps {
  onClick: any
}

export const HelpMenu: FC<MenuHelpProps> = ({ onClick }) => {
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

  const getMenuItems = () => {
    const sections =  [
      {
        title: 'help_menu_resources',
        icon: <BsBook />,
        url: '/help/resources'
      },
      {
        title: 'give_us_feedback',
        icon: <VscFeedback />,
        url: '/help/feedback'
      },
      {
        title: 'support',
        icon: <BiSupport />,
        url: '/help/support'
      },
      {
        title: 'updates',
        icon: <BsStar />,
        method: () => window.open('https://headwayapp.co/kiota-changelog', '_blank')
      }

    ]
    return sections
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
        id={'help-button'}
        {...triggerProps}
        onClick={() => setOpen(!isOpen)}
        className={'bg-bg-buttons-secondary border border-border-buttons-secondary focus:outline-none custom-circle hover:shadow-inner shadow-soft-white w-8 h-8 rounded-full ml-2'}
      >
        <IoHelpOutline className={'text-text-buttons-secondary w-7'} />
      </button>

      {isOpen &&
        renderLayer(
          <ul
            {...layerProps}
            className={'mt-2 px-2 py-2 z-30 | shadow-hover border bg-white rounded-2xl border-border-buttons-secondary'}
          >
            {getMenuItems().map((i, index) => (
              <li
                key={index}
                onClick={() =>
                  i.method ? handleMethod(i.method) : handleRedirect(i.url)
                }
                className={'px-2 py-2 flex text-main items-center cursor-pointer text-sm text-gray'}
              >
                <span className={'mr-2 text-main'}>{i.icon}</span>
                <span className='hover:font-bold'>{t(i.title)}</span>
              </li>
            ))}
            <Arrow
              {...arrowProps}
              borderColor='#61D8BD'
              borderWidth={1}
              className={'w-5'}
            />
          </ul>
        )}
    </>
  )
}
