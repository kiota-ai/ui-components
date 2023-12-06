import { FC } from "react";

export interface BannerResponsiveProps {
  height:string;
  backgroundSize:string;
}

export const BannerResponsive:FC<BannerResponsiveProps> = ({height='8rem',backgroundSize='contain'}) => {
  return (<div className={`bg-no-repeat w-screen absolute top-0 left-0 lg:hidden bg-banner`} style={{height,backgroundSize}}></div>)
}
