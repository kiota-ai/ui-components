import { FC } from 'react';
export interface MenuProps {
    sections: any[];
    onClick: any;
    onClickOpenMenu?: any;
    activePath: any;
    logoUrl: string;
    logoAltUrl: string;
    activeMenu?: boolean;
}
export declare const Menu: FC<MenuProps>;
