/* eslint-disable @typescript-eslint/no-explicit-any */
import classnames from 'classnames'
import { Tooltip } from '../Tooltip'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { FC } from 'react';

export interface CircularChardProps {
  width?: any;
  value?: any;
  valueText?: any;
  fontSize?: any;
  monoColor?: any;
  maxValue?: any;
  title?: any;
  tooltip?: any;
}

export const CircularChard:FC<CircularChardProps> = ({
  width = '30',
  value = '25.30',
  valueText = 'SI',
  title,
  fontSize = '4xl',
  monoColor = false,
  maxValue = 100,
  tooltip
}) => {
  return (
    <>
      <div className="text-center">
        <div className={'shadow-soft-white rounded-full'}>
          <CircularProgressbarWithChildren
            maxValue={maxValue}
            strokeWidth={width}
            value={value}
            styles={{
              text: {
                fontSize: '10px',
                fill:
                  // activeTheme && activeTheme === "light" ? "#333333" : "white",
                  'black',
              },
              trail: {
                // Trail color
                strokeWidth: 2,
                strokeLinecap: 'round',
                // Rotate the trail
                transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
                stroke: '#d6d6d6'
              },
              path: {
                // Trail color
                stroke: monoColor
                  ? '#4D70B3'
                  : value >= 0 && value <= 24
                    ? 'rgba(190, 218, 255)'
                    : value >= 25 && value <= 49
                      ? 'rgba(161, 190, 255)'
                      : value >= 50 && value <= 74
                        ? 'rgba(133, 163, 235)'
                        : value >= 75 && value <= 99
                          ? 'rgba(105, 137, 207)'
                          : '#4D70B3',
                strokeWidth: 2,
                strokeLinecap: 'round',
                filter: 'drop-shadow(1px 3px 2px rgba(0, 0, 0, 0.4))'
              }
            }}
          >
            <div className="flex flex-col items-center">
              <span className={classnames(`text-${fontSize} font-semibold`)}>
                {valueText}
              </span>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        {title && !tooltip && (
          <div className="text-sm font-semibold mt-4">{title}</div>
        )}
        {title && tooltip && (
          <div className="text-sm font-semibold mt-4 flex w-full justify-center">
            <div>{title}</div>
            <div className="flex items-center">
              <Tooltip
                dataFor={title}
                children={
                  <>
                    <p className={'text-black font-bold'}>{tooltip}</p>
                  </>
                }
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
