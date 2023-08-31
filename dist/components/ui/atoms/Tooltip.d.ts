import React, { FC } from 'react';
interface TooltipProps {
    dataFor?: string;
    infoTootlip?: boolean;
    basicAumented?: boolean;
    children1?: React.ReactNode;
    children?: React.ReactNode;
    setHeight?: boolean;
    icon?: boolean;
    dataDelay?: string;
}
export declare const Tooltip: FC<TooltipProps>;
export {};
