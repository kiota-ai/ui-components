import { FC } from 'react';
export interface PieChartProps {
    data: any[];
    legend: boolean;
    linkLabels: boolean;
}
export declare const PieChart: FC<PieChartProps>;
