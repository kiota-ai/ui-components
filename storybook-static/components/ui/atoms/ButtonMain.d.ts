import { FC } from "react";
export interface ButtonProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    marginRight?: string;
    marginLeft?: string;
    icon?: string;
    iconComponent?: React.ReactNode;
    text?: string;
    disabled?: boolean;
    width?: string;
    paddingVertical?: string;
}
export declare const ButtonMain: FC<ButtonProps>;
