import { FC } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  onBackClick?: () => void;
  removeMargin?: boolean;
}


export const PageTitle: FC<PageHeaderProps> = ({
  title,
  showBack = false,
  onBackClick,
  removeMargin = false
}) => {

  return (
    <div className='flex'>
      <div className={`text-3xl text-main font-bold ${removeMargin ? '' : 'mb-4'}`}>
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
