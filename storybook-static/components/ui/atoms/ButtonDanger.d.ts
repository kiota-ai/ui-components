import { FC } from "react";
export interface ButtonDangerProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    marginRight?: string;
    marginLeft?: string;
    marginTop?: string;
    width?: string;
    icon?: string;
    iconComponent?: React.ReactNode;
    text?: string;
    disabled?: boolean;
}
export declare const ButtonDanger: FC<ButtonDangerProps>;
