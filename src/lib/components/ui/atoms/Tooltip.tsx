import ReactTooltip from 'react-tooltip'
import React, { FC } from 'react'
import Help from '../../../../assets/images/help_circle_outline.svg'
import Augmented from '../../../../assets/images/search.svg'
import './tooltip.css'

export interface TooltipProps {
  dataFor?: string;
  infoTootlip?: boolean;
  basicAumented?: boolean;
  children1?: React.ReactNode;
  children?: React.ReactNode;
  setHeight?: boolean;
  icon?: boolean;
  dataDelay?: string;
}

export const Tooltip: FC<TooltipProps> = ({
  dataFor,
  infoTootlip = true,
  basicAumented = false,
  children1,
  children,
  setHeight = false,
  icon = true,
  dataDelay = '0'
}) => {
  return (
    <div className={`${setHeight ? 'h-3.5' : 'h-auto flex'}`}>
      {infoTootlip && icon
        ? (
          <button data-tip data-for={dataFor}>
            <img src={Help} alt="Help icon" className="w-3.5 ml-1" />
          </button>
        )
        : (
          <button data-tip data-for={dataFor} data-delay-show={dataDelay}>
            {children1}
            {basicAumented && icon && (
              <img src={Augmented} alt="More info" className="inline w-2" />
            )}
          </button>
        )}

      {infoTootlip && (
        <ReactTooltip
          id={dataFor}
          type="error"
          backgroundColor="#fff"
        >
          <div className="text-xxxs max-w-sm text-black rounded-2xl p-2">
            {children}
          </div>
        </ReactTooltip>
      )}

      {!infoTootlip && basicAumented && (
        <ReactTooltip
          id={dataFor}
          type="error"
          delayHide={500}
          effect="solid"
          clickable={true}
          className="customTooltip"
        >
          <div className="text-xs max-w-xs flex text-black flex flex-col">
            {children}
          </div>
        </ReactTooltip>
      )}
      {!infoTootlip && !basicAumented && (
        <ReactTooltip
          id={dataFor}
          type="error"
          delayHide={500}
          effect="solid"
          clickable={true}
          className="customTooltipColumn"
        >
          <div className="text-xs max-w-sm flex text-black flex flex-col">
            {children}
          </div>
        </ReactTooltip>
      )}
    </div>
  )
}
