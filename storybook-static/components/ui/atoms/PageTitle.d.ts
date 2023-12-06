import { FC } from 'react';
export interface PageHeaderProps {
    title: string;
    showBack?: boolean;
    onBackClick?: () => void;
    removeMargin?: boolean;
    className: string;
}
export declare const PageTitle: FC<PageHeaderProps>;
