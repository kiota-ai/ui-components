import { FC } from "react";
interface ButtonProps {
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
export declare const ButtonDanger: FC<ButtonProps>;
export {};
