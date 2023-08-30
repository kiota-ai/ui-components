import { FC } from 'react';
interface SelectProps {
    label?: string;
    placeholder?: string;
    name?: string;
    reset?: boolean;
    setReset?: React.Dispatch<React.SetStateAction<boolean>>;
    items?: Array<{
        id: number;
        value: string;
        image?: React.ReactNode;
        disabled?: boolean;
    }>;
    multiSelect?: boolean;
    error?: {
        message: string;
    } | null;
    initialValues?: any;
    onSelect?: any;
    sort?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    isClearable?: boolean;
    showQuantity?: boolean;
    noOptionsText?: string;
}
export declare const Select: FC<SelectProps>;
export {};
