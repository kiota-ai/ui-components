import { FC } from "react";
interface InputProps {
    reference?: React.RefObject<any>;
    error?: any;
    label: string;
    placeholder: string;
    rows?: number;
    required?: boolean;
    className?: string;
    labelClassName?: string;
}
export declare const TextArea: FC<InputProps>;
export {};
