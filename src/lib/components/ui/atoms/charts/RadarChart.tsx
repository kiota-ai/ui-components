/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveRadar } from '@nivo/radar'
import { omit } from 'lodash'
import { FC } from 'react';


export interface RadarChartProps {
  data: any[];
  legend?:boolean;
  gridLabelOffset?:number;
  gridShape?:any;
  maxValue?:number
}

export const RadarChart:FC<RadarChartProps> = ({
  data,
  legend = true,
  gridLabelOffset = 20,
  gridShape = 'circular',
  maxValue = 100
}) => {
  return (
    <ResponsiveRadar
      data={data}
      keys={Object.keys(omit(data[0], ['id', 'description']))}
      indexBy="id"
      maxValue={maxValue}
      margin={{ top: 60, right: 60, bottom: 60, left: 0 }}
      curve="linearClosed"
      borderWidth={0}
      borderColor={{ from: 'color' }}
      gridLevels={10}
      gridShape={gridShape}
      gridLabelOffset={gridLabelOffset}
      enableDots={false}
      dotSize={10}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      dotBorderColor={{ from: 'color' }}
      enableDotLabel={true}
      colors={['#4D70B3', '#E5E5E5', '#83868D', '#AFCDDD', '#eeeeee']}
      fillOpacity={0.5}
      blendMode="multiply"
      animate={true}
      motionConfig="wobbly"
      isInteractive={true}
      legends={
        legend
          ? [
              {
                anchor: 'top-left',
                direction: 'column',
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000'
                    }
                  }
                ]
              }
            ]
          : []
      }
    />
  )
}
