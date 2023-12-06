import { FC } from 'react';
export interface SidePanelProps {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
    width: string;
    showExpand?: boolean;
}
export declare const SidePanel: FC<SidePanelProps>;
