import { FC } from "react";
export interface CardProps extends React.HTMLProps<HTMLDivElement> {
    id?: string;
    title: string;
    children: React.ReactNode;
    padding?: string;
    movilePadding?: string;
    marginX?: string;
    movileMarginX?: string;
    movileMarginY?: string;
    marginY?: string;
    marginYB?: string;
    width?: string;
    rounded?: string;
    startupsList?: boolean;
    clickable?: boolean;
    onClick?: () => void;
    wrapperClassName?: string;
    containerClassName?: string;
    bgColor?: string;
}
export declare const Card: FC<CardProps>;
