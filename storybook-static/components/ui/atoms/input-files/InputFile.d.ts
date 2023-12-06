import { FC } from 'react';
export interface FileInputProps {
    error: any;
    label: string;
    placeholder: string;
    selectedFile: any;
    setSelectedFile: any;
    id: string;
    accept?: any;
    fileError: string;
    className?: string;
    height?: string;
    padding?: string;
    multiple?: boolean;
}
export declare const InputFile: FC<FileInputProps>;
