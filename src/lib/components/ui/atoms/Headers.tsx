/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import { PopoverMenu } from './PopoverMenu'

interface HeaderProps {
  onClick:any
}

export const Header:FC<HeaderProps> = ({ onClick }) => {

  return (
    <header className={`p-3 pr-10 w-full flex justify-end items-center`}>
      <div className="flex items-center" id="header-options">

        <PopoverMenu onClick={onClick} />
      </div>
    </header>
  )
}
