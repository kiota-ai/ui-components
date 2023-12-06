/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import BeatLoader from 'react-spinners/BeatLoader'


export interface SpinnerProps {
  color?: string;
  loading?: boolean;
}

export const Spinner:FC<SpinnerProps> = ({ color = '#4d70b3', loading }) => {
  return (
    <div className="sweet-loading">
      <BeatLoader color={color} loading={loading}  size={5} />
    </div>
  )
}
