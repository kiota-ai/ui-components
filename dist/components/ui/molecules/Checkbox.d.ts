import React, { FC } from 'react';
interface CheckboxProps {
    name?: string;
    id?: string;
    reference?: React.Ref<HTMLInputElement>;
    label?: string;
    error?: any;
    checked?: boolean;
    onChange?: any;
    onClick?: any;
    value?: string;
    disabled?: boolean;
    help?: string;
    dataFor?: string;
    children?: React.ReactNode;
    width?: string;
}
export declare const Checkbox: FC<CheckboxProps>;
export {};
