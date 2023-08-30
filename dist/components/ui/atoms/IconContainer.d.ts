import { FC } from "react";
interface IconButtonProps {
    onClick: () => void;
    bgColor?: string;
    width?: string;
    height?: string;
    shadow?: string;
    shadowHover?: string;
    icon?: string;
    iconWidth?: string;
    alt?: string;
    marginY?: string;
}
export declare const IconContainer: FC<IconButtonProps>;
export {};
