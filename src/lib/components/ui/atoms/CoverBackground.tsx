import { FC } from "react";

interface CoverBackgroundProps {
  link:string;
}
export const CoverBackground:FC<CoverBackgroundProps> = ({ link = 'false' }) => {
  return (
    <div className={`hidden lg:block bg-main`}>
      <div style={{ height: 'calc(100vh - 5rem)' }}>
        <img src="https://kiota-public-resources.s3.amazonaws.com/logo_000.svg" alt="Logo" className="w-full h-full" />
      </div>
      {link && (
        <div >
          <div className={`w-full flex justify-center items-center relative bottom-16 xl:bottom-42`}>
            <a
              href="https://www.kiota.com"
              target="_blank"
              rel="noreferrer"
              className={`absolute translate-y-1/2 bg-white px-5 py-1 text-xs font-medium rounded-md cursor-pointer text-main hover:text-link-hover`}
            >
              www.kiota.com
            </a>
            <hr className="w-8/12 h-full  text-white"></hr>
          </div>
        </div>
      )
      }
    </div>

  )
}
