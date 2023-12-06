/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveFunnel } from '@nivo/funnel'
import { FC } from 'react';

export interface FunnelProps {
  data: any;
  margin:any
}

export const FunnelChart:FC<FunnelProps> = ({ 
    data=[],
    margin={ top: 20, right: 20, bottom: 20, left: 20 },
    ...inputProps
}) => (
    <ResponsiveFunnel
        
        data={data}
        margin={margin}
        direction="horizontal"
        shapeBlending={0.74}
        valueFormat=">-.4s"
        colors={{ scheme: 'spectral' }}
        borderWidth={0}
        labelColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    3
                ]
            ]
        }}
/*         beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
        motionConfig="wobbly" */
        { ...inputProps}
    />
)