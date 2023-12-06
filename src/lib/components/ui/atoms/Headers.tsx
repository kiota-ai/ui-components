/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import { PopoverMenu } from './PopoverMenu'
import { HelpMenu } from './HelpMenu'
import { RemindersMenu } from './RemindersMenu'
import { AiOutlineMenu } from 'react-icons/ai'

export interface HeaderProps {
  onClick:any,
  onClickOpenMenu?:any;
  items: any[],
  reminders?: any[],
  totalReminders?: any;
  logoUrl?: string;

}

export const Header:FC<HeaderProps> = ({ onClick,items,reminders=[],totalReminders=0,logoUrl,onClickOpenMenu }) => {

  const logo = logoUrl ? logoUrl : 'https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg'
  return (
    <header className={`w-full flex justify-end items-center`}>
       <div className="sm:hidden p-3 pr-10 w-full flex justify-between items-center bg-main">
        <div>
          <AiOutlineMenu onClick={() => onClickOpenMenu ? onClickOpenMenu(): {}} className='cursor-pointer w-8 h-8 text-white'/>
        </div>
        <div className='text-center flex flex-row items-center justify-center w-full'>
          <img src={logo} alt="Difree Logo" className="object-fit" />
        </div>
      </div>
      <div className='hidden sm:block flex justify-end'>
        <div className="p-3 pr-10 w-full flex justify-end items-center">
          <div className="flex items-center" id="header-options">
            <HelpMenu onClick={onClick}></HelpMenu>
            <RemindersMenu onClick={onClick} reminders={reminders} totalReminders={totalReminders} ></RemindersMenu>
            <PopoverMenu onClick={onClick} items={items} />
          </div>
        </div>
      </div>
    </header>
  )
}

