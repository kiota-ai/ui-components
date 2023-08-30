import { FC } from 'react';
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    reference: React.Ref<HTMLInputElement>;
    error?: any;
    label?: string;
    placeholder?: string;
    type: string;
    maxLength?: number;
    required?: boolean;
}
export declare const Input: FC<InputFieldProps>;
export {};
