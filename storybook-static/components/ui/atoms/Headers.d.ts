import { FC } from 'react';
export interface HeaderProps {
    onClick: any;
    onClickOpenMenu?: any;
    items: any[];
    reminders?: any[];
    totalReminders?: any;
    logoUrl?: string;
}
export declare const Header: FC<HeaderProps>;
