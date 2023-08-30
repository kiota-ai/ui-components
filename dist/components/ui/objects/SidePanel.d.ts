import { FC } from 'react';
interface SidePanelProps {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
    width: string;
    showExpand?: boolean;
}
export declare const SidePanel: FC<SidePanelProps>;
export {};
