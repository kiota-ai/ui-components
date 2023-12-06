/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveBar } from '@nivo/bar'
import { FC } from 'react';
export interface BarChartProps {
  keys: any;
  axisRotation: any;
  data: any;
  groupMode: any;
  legends: any;
  borderRadius:any;
  margin:any
}

export const BarChart:FC<BarChartProps> = ({ 
  data=[], 
  axisRotation='', 
  keys=[],
  groupMode= 'grouped',
  legends=[
    {
      dataFrom: 'keys',
      anchor: 'top-left',
      direction: 'row',
      justify: false,
      translateX: 0,
      translateY: -30,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: 'left-to-right',
      itemOpacity: 0.85,
      symbolSize: 12
    }
  ],
  borderRadius=3,
  margin={ top: 40, right: 100, bottom: 60, left: 140 },
}) => {
  return (
    <ResponsiveBar
      groupMode={groupMode}
      data={data}
      enableLabel={false}
      colors={['#4D70B3', '#67A7DE']}
      keys={keys}
      indexBy={'indexed'}
      borderRadius={borderRadius}
      margin={margin}
      // isInteractive={false}
      labelTextColor={'#fff'}
      labelSkipWidth={16}
      labelSkipHeight={16}
      axisBottom={{
        tickRotation: axisRotation
      }}
      legends={legends}
    />
  )
}

