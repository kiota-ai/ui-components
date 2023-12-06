import { FC } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  onBackClick?: () => void;
  removeMargin?: boolean;
  className: string;
}


export const PageTitle: FC<PageHeaderProps> = ({
  title,
  showBack = false,
  onBackClick,
  removeMargin = false,
  className= ''
}) => {

  return (
    <div className='flex'>
      <div className={`flex items-center text-3xl text-main font-bold ${removeMargin ? '' : 'mb-4'} ${className}`}>
        {showBack && (
          <FaArrowLeft
            className="inline-block mr-3 cursor-pointer"
            onClick={onBackClick}
          />
        )}
        {title}
      </div>
    </div>
  )
}
