import { FC } from 'react';
interface FileInputProps {
    error: any;
    label: string;
    placeholder: string;
    selectedFile: File | null;
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
export {};
