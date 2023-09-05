import { FC } from "react";

interface CoverBackgroundProps {
  link:string;
  image: string;
  backgroundClass: string;
}

const defaultImage = 'https://kiota-public-resources.s3.amazonaws.com/logo_000.svg'
const defaultLink = 'https://www.kiota.com'
const defaultLinkPreview = 'www.kiota.com'

export const CoverBackground:FC<CoverBackgroundProps> = ({ link = 'false', image=defaultImage,backgroundClass= 'bg-main' }) => {
  return (
    <div className={`hidden lg:block ${backgroundClass}`}>
      <div style={{ height: 'calc(100vh - 5rem)' }}>
        <img src={image} alt="Logo" className="w-full h-full" />
      </div>
      {link !== 'false' && (
        <div >
          <div className={`w-full flex justify-center items-center relative bottom-16 xl:bottom-42`}>
            <a
              href={link ? link : defaultLink}
              target="_blank"
              rel="noreferrer"
              className={`absolute translate-y-1/2 bg-white px-5 py-1 text-xs font-medium rounded-md cursor-pointer text-main hover:text-link-hover`}
            >
              {link ? link : defaultLinkPreview}
            </a>
            <hr className="w-8/12 h-full  text-white"></hr>
          </div>
        </div>
      )
      }
    </div>

  )
}
