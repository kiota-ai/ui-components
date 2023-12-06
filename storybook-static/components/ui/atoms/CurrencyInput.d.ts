import { FC } from 'react';
export interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    reference: React.Ref<HTMLInputElement>;
    error?: any;
    label?: string;
    placeholder?: string;
    type: string;
    maxLength?: number;
    required?: boolean;
    className?: string;
    labelClassName?: string;
    nameInput: any;
    nameSelect: string;
    icon: any;
    setValue: any;
    watch: any;
    switchOption: any;
    switchTooltip: any;
    switchText: any;
    switchValue: any;
    setSwitchValue: any;
}
export declare const CurrencyInput: FC<CurrencyInputProps>;
