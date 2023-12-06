import { FC } from 'react';
export interface CheckboxProps {
    onChange: (event: any) => void;
    checked: boolean;
    text: string;
    error?: any;
    size?: 'sm' | 'md' | 'lg';
    textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    tooltip?: boolean;
    disabled?: boolean;
    noShadow?: boolean;
    classContentName: string;
}
export declare const Switch: FC<CheckboxProps>;
