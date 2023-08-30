import { FC } from 'react';
interface AlertProps {
    children: React.ReactNode;
    onDismiss: () => void;
    appearance?: 'error' | 'success' | 'alert';
}
export declare const BasicToast: FC<AlertProps>;
export {};
