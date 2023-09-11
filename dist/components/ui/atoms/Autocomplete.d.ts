import React, { FC } from 'react';
interface SelectProps {
    placeholder: string;
    isClearable?: boolean;
    options: any[];
    reference: any;
    error?: any;
    label?: any;
    onSelect?: (selectedOption: any) => void;
    initialValues?: any | null;
    reset?: boolean;
    setReset?: (reset: boolean) => void;
    searchKey?: string;
    displayKey?: string;
    required?: boolean;
    noOptionsText?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
export declare const Autocomplete: FC<SelectProps>;
export {};
