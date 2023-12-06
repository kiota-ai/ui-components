/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveLine } from '@nivo/line'
import { FC } from 'react';

export interface LineChartProps {
  marginRight: number;
  marginLeft: number;
  sample: boolean;
  data: any;
}

export const LineChart:FC<LineChartProps> = ({
  marginRight = 0,
  marginLeft = 30,
  sample = false,
  data,
  ...restOfProps
}) => {
  return (
    <ResponsiveLine
      axisLeft={{
        tickValues: 4
      }}
      data={data}
      colors={sample ? ['#E5E5E5'] : ['#67A7DE', '#b667de', '#deb467']}
      margin={{ top: 10, right: marginRight, bottom: 50, left: marginLeft }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      yFormat=" >-.2X"
      axisTop={null}
      curve={'basis'}
      axisRight={null}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={!sample}
      enableArea={true}
      enableGridX={false}
      enableGridY={false}
      {...restOfProps}
    />
  )
}

