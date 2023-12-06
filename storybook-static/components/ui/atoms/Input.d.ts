import { FC } from 'react';
export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    reference: React.Ref<HTMLInputElement>;
    error?: any;
    label?: string;
    placeholder?: string;
    type: string;
    maxLength?: number;
    required?: boolean;
    className?: string;
    labelClassName?: string;
}
export declare const Input: FC<InputFieldProps>;
