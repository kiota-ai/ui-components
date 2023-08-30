import { FC } from "react";

interface ToastContainerProps {
  children: React.ReactNode;
}

export const ToastContainer:FC<ToastContainerProps> = ({ children }) => (
  <div
    style={{ zIndex: 99 }}
    className="absolute top-0 right-0 flex justify-end box-border max-h-full w-full overflow-x-hidden overflow-y-auto"
  >
    {children}
  </div>
)
