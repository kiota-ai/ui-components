import { FC, ReactNode } from "react";
export interface NoDataInfoProps {
    image: ReactNode | string;
    title: string;
    textOne: string;
    textTwo: string;
    backgroundImage: string;
    showExtraTextOnHover?: boolean;
    className?: string;
}
export declare const NoDataInfo: FC<NoDataInfoProps>;
