import { FC } from "react";
export interface ButtonCardSecondaryProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    marginRight?: string;
    marginLeft?: string;
    icon?: string;
    iconComponent?: React.ReactNode;
    text?: string;
    disabled?: boolean;
}
export declare const ButtonCardSecondary: FC<ButtonCardSecondaryProps>;
