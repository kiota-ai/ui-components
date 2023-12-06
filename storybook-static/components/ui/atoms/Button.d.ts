import { FC } from "react";
export interface ButtonsProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    width?: string;
    verticalMargin?: string;
    vertical?: string;
    horizontal?: string;
    marginRight?: string;
    marginLeft?: string;
    bgColor?: string;
    textColor?: string;
    bgHoverColor?: string;
    borderColor?: string;
    textColorHover?: string;
    icon?: string;
    iconComponent?: React.ReactNode;
    text?: string;
    disabled?: boolean;
    textSize?: string;
    weight?: string;
    shadow?: string;
    iconWidth?: string;
    textAlign?: string;
    className?: string;
}
export declare const Button: FC<ButtonsProps>;
