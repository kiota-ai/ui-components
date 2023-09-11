import { FC } from 'react';
export interface TextInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange?: (event: unknown) => void;
    onInput?: (event: unknown) => void;
}
export declare const TextInput: FC<TextInputProps>;
