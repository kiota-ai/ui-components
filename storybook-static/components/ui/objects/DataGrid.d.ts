import { FC } from 'react';
export interface DataGridProps {
    headers?: any[];
    data?: any[];
    actions?: any[];
    compact?: boolean;
    bordered?: boolean;
    stickyHeader?: boolean;
    stickyActions?: boolean;
    wrapperClassName?: string;
    actionsHeaderClassName?: string;
}
export declare const DataGrid: FC<DataGridProps>;
