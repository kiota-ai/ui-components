/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useTranslation } from 'react-i18next'
import { Spinner } from './Spinner'

interface GoogleLoginProps {
  clientId: string;
  onSuccess: () => void;
  onFailure: (error: any) => void;
  cookiePolicy?: 'none' | 'single_host_origin' | 'single_host_origin_with_path';
  text?: string;
  loadingGoogleLogin?: boolean;
  disabled?: boolean;
}

export const GoogleButton: FC<GoogleLoginProps> = ({
  clientId,
  onSuccess,
  onFailure,
  cookiePolicy,
  text,
  loadingGoogleLogin,
  disabled
}) => {
  const { t } = useTranslation()

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText={t('login_google_button')}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={cookiePolicy}
      disabled={disabled}
      className={`google-button inline-flex justify-center | w-full | py-0.5 px-7 | text-center text-sm font-semibold bg-bg-buttons-seconday border-border-buttons-secondary text-text-buttons-secondary font-sans | rounded-2xl  opacity-100 outline-none focus:outline-none | placeholder-gray | cursor-pointer transition-all duration-200 | shadow-hover hover:shadow-inner | disabled:cursor-default`}
    >
      {loadingGoogleLogin
        ? (
          <div className="flex items-center">
            <span className="mr-4">{text}</span>
            <span>
              <Spinner />
            </span>
          </div>
        )
        : (
          <span>{text}</span>
        )}
    </GoogleLogin>
  )
}
