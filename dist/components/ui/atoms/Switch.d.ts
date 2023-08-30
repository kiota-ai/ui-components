import { FC } from 'react';
interface CheckboxProps {
    onChange: (event: any) => void;
    checked: boolean;
    text: string;
    error?: any;
    size?: 'sm' | 'md' | 'lg';
    textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    tooltip?: boolean;
    disabled?: boolean;
}
export declare const Switch: FC<CheckboxProps>;
export {};
