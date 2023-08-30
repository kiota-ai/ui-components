import { FC } from "react";
interface ButtonProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    marginRight?: string;
    marginLeft?: string;
    marginTop?: string;
    icon?: string;
    iconComponent?: React.ReactNode;
    text?: string;
    disabled?: boolean;
    width?: string;
    paddingVertical?: string;
}
export declare const ButtonSecondary: FC<ButtonProps>;
export {};
