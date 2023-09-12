/* eslint-disable @typescript-eslint/no-explicit-any */
/* import { css } from '@emotion/core' */
import { FC } from 'react';
import BeatLoader from 'react-spinners/BeatLoader'

/* const override:any = css`
  display: block;
  margin: 0 auto;
  border-color: #4d70b3;
` */

interface SpinnerProps {
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
