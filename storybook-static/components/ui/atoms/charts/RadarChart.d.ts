import { FC } from 'react';
export interface RadarChartProps {
    data: any[];
    legend?: boolean;
    gridLabelOffset?: number;
    gridShape?: any;
    maxValue?: number;
}
export declare const RadarChart: FC<RadarChartProps>;
