import { FC } from 'react';
import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa'

interface AlertProps {
  children: React.ReactNode;
  onDismiss: () => void;
  appearance?: 'error' | 'success' | 'alert';
}

export const BasicToast: FC<AlertProps> = ({ children, onDismiss, appearance = 'error' }) => {
  const classes = {
    error: 'bg-red',
    success: 'bg-green',
    alert: `bg-main`
  }

  return (
    <div
      onClick={onDismiss}
      className={`${classes[appearance]} text-white font-semibold flex items-center justify-start w-72 text-white shadow-basic rounded-2xl cursor-pointer text-xs font-normal m-4 p-4`}
    >
      {appearance === 'success' && <FaCheckCircle className="mr-2 inline-block text-sm w-12" />}
      {appearance === 'error' && <FaTimesCircle className="mr-2 inline-block text-sm w-12" />}
      {appearance === 'alert' && <FaInfoCircle className="mr-2 inline-block text-sm w-12" />}

      <span>{children}</span>
    </div>
  )
}
