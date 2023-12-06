/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'
import { FC, useEffect, useState } from 'react'
import { Arrow, useLayer } from 'react-laag'
import { FaBell, FaCalendarAlt, FaCheckCircle, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import Avatar from 'react-avatar'
import moment from 'moment'
import { AiFillFlag } from 'react-icons/ai'

export interface RemindersMenuProps {
  onClick:any,
  reminders: any[],
  totalReminders: any
}

export const RemindersMenu:FC<RemindersMenuProps> = ({onClick,reminders,totalReminders}) => {
  const { t } = useTranslation()
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  const getReminderIcon = (reminder:any, t:any, small = false) => {
    if (reminder.reminder_type === 'call') return <FaPhoneAlt data-tip={t(reminder.reminder_type)} className={`inline ${small ? 'w-4 h-4' : 'w-6 h-6'} mr-1`} />
    if (reminder.reminder_type === 'meeting') return <FaCalendarAlt data-tip={t(reminder.reminder_type)} className={`inline ${small ? 'w-4 h-4' : 'w-6 h-6'} mr-1`} />
    if (reminder.reminder_type === 'task') return <FaCheckCircle data-tip={t(reminder.reminder_type)} className={`inline ${small ? 'w-4 h-4' : 'w-6 h-6'} mr-1`} />
    if (reminder.reminder_type === 'deadline') return <AiFillFlag data-tip={t(reminder.reminder_type)} className={`inline ${small ? 'w-4 h-4' : 'w-6 h-6'} mr-1`} />
    if (reminder.reminder_type === 'email') return <FaEnvelope data-tip={t(reminder.reminder_type)} className={`inline ${small ? 'w-4 h-4' : 'w-6 h-6'} mr-1`} />
    return <HiOutlineDotsCircleHorizontal data-tip={t(reminder.reminder_type)} className={`inline ${small ? 'w-4 h-4' : 'w-6 h-6'} mr-1`} />
  }

  const handleRedirect = (url:any) => {
    onClick(url)
  }


  const getReminders = () => {
    if (totalReminders) {
      return [
        ...reminders,
        {
          title: totalReminders - reminders.length ? `${t('go_to_reminders')} (+${totalReminders - reminders.length})` : `${t('go_to_reminders')}`,
          icon: <FaBell />,
          url: '/reminders'
        }
      ]
    } else {
      return [
        { title: t('reminders_not_found_today') },
        {
          title: t('go_to_reminders'),
          icon: <FaBell />,
          url: '/reminders'
        }
      ]
    }
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
    <div>
      <button
        id={'reminders-button'}
        {...triggerProps}
        onClick={() => setOpen(!isOpen)}
        className={'flex justify-center items-center bg-bg-buttons-secondary border border-border-buttons-secondary focus:outline-none custom-circle hover:shadow-inner shadow-soft-white w-8 h-8 rounded-full ml-2'}
      >
        <FaBell className={'text-text-buttons-secondary w-3'} />
        {totalReminders > 0 && (
          <span className="inline-block w-1.5 h-1.5 bg-red -mr-1.5 mb-2 rounded-full" />
        )}
      </button>

      {isOpen &&
        renderLayer(
          <ul
            {...layerProps}
            className={'mt-2 px-2 py-2 z-30 | shadow-hover border bg-white rounded-2xl border-border-buttons-secondary'}
          >
            {getReminders().map((i, index) => (
              <li
                key={index}
                onClick={!i.reminder ? () => handleRedirect(i.url) : ()=>{}}
                className={`px-2 py-2 flex text-main items-center ${!i.reminder && 'cursor-pointer'} ${i.reminder && 'border-b border-gray-lines'} text-sm text-gray`}
              >
                {!i.reminder && <>
                  <span className={'mr-2 text-main'}>{i.icon}</span>
                  <span className={'hover:font-bold'}>{t(i.title)}</span>
                </>}
                {i.reminder && <>
                  {i.reminder_type && <span className={'mr-2 text-main'}>{getReminderIcon(i, t)}</span>}
                  <div className='flex flex-col'>
                    <div>
                      <Avatar
                        src={i.deal.logo}
                        size="15"
                        round={true}
                        color="#e0e6f2"
                        fgColor="#4d70b3"
                        alt={t('logo')}
                        className='mr-2'
                      />
                      <span className='text-sm'>{i.deal.name}</span>
                    </div>
                    <div>
                      <span className='text-xs'>{`${t(i.reminder)} (${moment(i.date).format('HH:MM')})`}</span>
                    </div>
                  </div>
                </>}
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
    </div>
  )
}
