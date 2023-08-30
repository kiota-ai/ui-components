import ReactDOM from 'react-dom'
import { IoIosContract, IoIosExpand } from 'react-icons/io'
import { FaTimes } from 'react-icons/fa'

import { FC, useState } from 'react';

interface SidePanelProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  width: string;
  showExpand?: boolean;
}

export const SidePanel:FC<SidePanelProps> = ({ children, onClose, title, width, showExpand = false }) => {

  const [expand, setExpand] = useState(false)

  return ReactDOM.createPortal(
    <div
      className="fixed z-50 left-0 top-0 w-screen h-screen bg-gray-opacity side-panel"
    >
      <div
        className={`fixed top-0 right-0 h-screen mb-16 shadow-soft-white overflow-auto overscroll-y-auto transition ${width && !expand && `w-${width}`} ${expand && 'w-10/12'}`}
        style={{ backgroundColor: "#F8F8F9", animation: 'appearFromRight 0.3s ease-in-out' }}
      >
        <div className={`flex px-4 py-3 bg-main text-white text-lg items-center flex justify-between`}>
          <div onClick={() => onClose && onClose()}>
            <FaTimes className="inline mr-4 relative -mt-1 cursor-pointer" />
            {title}
          </div>
          {showExpand && <div>
            {expand && <IoIosContract className="inline mr-4 relative -mt-1 cursor-pointer" onClick={() => setExpand(!expand)} />}
            {!expand && <IoIosExpand className="inline mr-4 relative -mt-1 cursor-pointer" onClick={() => setExpand(!expand)} />}
          </div>}
        </div>
        <div className="p-4 pt-6">
          {children}
        </div>
      </div>
    </div>
    , document.body
  )
}
