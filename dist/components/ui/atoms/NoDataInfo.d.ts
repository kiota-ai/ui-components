import { FC } from "react";
interface NoDataInfoProps {
    image: string;
    title: string;
    textOne: string;
    textTwo: string;
    backgroundImage: string;
    showExtraTextOnHover?: boolean;
    className?: string;
}
export declare const NoDataInfo: FC<NoDataInfoProps>;
export {};
