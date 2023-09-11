import { FC } from "react";

interface CoverBackgroundProps {
  link:boolean;
  linkUrl: string;
  linkPreview: string;
  image: string;
  backgroundClassLink: string;
  backgroundClass: string;
  colorClassLine: string;
}

const defaultImage = 'https://kiota-public-resources.s3.amazonaws.com/logo_000.svg'
const defaultLinkPreview = 'www.kiota.com'
const defaultLinkURL = 'https://www.kiota.com'

export const CoverBackground:FC<CoverBackgroundProps> = ({ 
  link = false,
  linkUrl=defaultLinkURL, 
  linkPreview=defaultLinkPreview, 
  image=defaultImage,
  backgroundClass= 'bg-main',
  backgroundClassLink= 'bg-white text-main hover:text-link-hover',
  colorClassLine= 'text-white',
  
}) => {
  return (
    <div className={`hidden lg:block ${backgroundClass}`}>
      <div style={{ height: 'calc(100vh - 5rem)' }}>
        <img src={image} alt="Logo" className="w-full h-full" />
      </div>
      {link && (
        <div >
          <div className={`w-full flex justify-center items-center relative bottom-16 xl:bottom-42`}>
            <a
              href={linkUrl}
              target="_blank"
              rel="noreferrer"
              className={`absolute translate-y-1/2 ${backgroundClassLink}  px-5 py-1 text-xs font-medium rounded-md cursor-pointer`}
            >
              {linkPreview}
            </a>
            <hr className={`w-8/12 h-full ${colorClassLine}`}></hr>
          </div>
        </div>
      )
      }
    </div>

  )
}
