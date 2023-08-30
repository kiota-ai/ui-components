import { FC } from 'react';
interface PageHeaderProps {
    title: string;
    showBack?: boolean;
    onBackClick?: () => void;
    removeMargin?: boolean;
}
export declare const PageTitle: FC<PageHeaderProps>;
export {};
