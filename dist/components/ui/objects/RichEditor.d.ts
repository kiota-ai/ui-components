import { FC } from 'react';
interface RichEditorProps {
    label: string;
    id: string;
    name: any;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    reference?: any;
    error?: any;
    className?: string;
    toolbarClassName?: string;
}
export declare const RichEditor: FC<RichEditorProps>;
export {};
