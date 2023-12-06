import { FC } from "react";
export interface CoverBackgroundProps {
    link: boolean;
    linkUrl: string;
    linkPreview: string;
    image: string;
    backgroundClassLink: string;
    backgroundClass: string;
    colorClassLine: string;
}
export declare const CoverBackground: FC<CoverBackgroundProps>;
