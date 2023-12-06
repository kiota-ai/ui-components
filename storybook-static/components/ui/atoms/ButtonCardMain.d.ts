import { FC } from "react";
export interface ButtonCardMainProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    marginRight?: string;
    marginLeft?: string;
    icon?: string;
    iconComponent?: React.ReactNode;
    text?: string;
    className?: string;
    disabled?: boolean;
}
export declare const ButtonCardMain: FC<ButtonCardMainProps>;
