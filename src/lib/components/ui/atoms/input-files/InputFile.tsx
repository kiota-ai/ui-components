/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useDropzone } from 'react-dropzone'
import { activeStyle, acceptStyle, rejectStyle } from './dropzone-styles'
import { DocumentIcon } from './DocumentIcon'

export interface FileInputProps {
  error: any;
  label: string;
  placeholder: string;
  selectedFile: any;
  setSelectedFile: any;
  id: string;
  accept?: any;
  fileError: string;
  className?: string;
  height?: string;
  padding?: string;
  multiple?: boolean;
}

export const InputFile: FC<FileInputProps> = ({
  error,
  label,
  placeholder,
  selectedFile,
  setSelectedFile,
  id,
  accept= '.pdf, .doc, .docx, .json, .ppt, .pptx, .xls, .xlsx, video/mp4, video/avi, video/mov',
  fileError,
  className = '',
  height = '',
  padding = '2rem',
  multiple = false,
  ...inputProps
}) => {
  const { t } = useTranslation()

  const dropzoneProps = useDropzone({
    multiple,
    minSize: 0,
    maxSize: 26214400000,
    accept,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[acceptedFiles.length - 1]
        setSelectedFile(multiple ? acceptedFiles : file)
      } else {
        setSelectedFile(null)
      }
    }
  })

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections
  } = dropzoneProps

  const fileRejectionItems = fileRejections.map(({ errors },index:number) => (
    <div key={index} className="mt-6">
      <div>
        {errors[0].code === 'file-too-large'
          ? (
            <span className="text-xs pt-6 text-red" key={errors[0].code}>
              {t('large_file')}
            </span>
          )
          : (
            <span className="text-xs pt-6 text-red" key={errors[0].code}>
              {errors[0].message}
            </span>
          )}
      </div>
    </div>
  ))

  const style = useMemo(() => ({
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
    ...(selectedFile ? activeStyle : {})
  }), [isDragActive])

  return (
    <>
      <div {...inputProps} className="flex flex-col justify-center">
        {label && (
          <label
            htmlFor={id}
            className="block mb-1 | text-left text-xs font-medium text-black"
          >
            {label}
          </label>
        )}
        <div
          {...getRootProps({
            style: { height, padding, ...style },
            className:
              `${className} 
              w-full flex flex-col items-center justify-center 
              rounded-xl text-center text-coolGray-500 placeholder-gray shadow-inner hover:border-dashed 
              cursor-pointer transition-all duration-200 
              outline-none hover:outline-none hover:shadow-focus 
              focus:border-2 focus:border-main focus:outline-none focus:shadow-focus 
              active:outline-none border`
          })}
        >
          <span className="text-xxs">
            {!isDragActive && !selectedFile && (placeholder || t('input_file_text'))}
          </span>

          {selectedFile && !fileError && (
            <>
              {!multiple && (
                <>
                  <DocumentIcon documentName={selectedFile.name} />
                  <p className={`text-xs text-main`}>{selectedFile.name}</p>
                </>
              )}

              {multiple && (
                <div className='text-center text-2xl'>
                  {t('multiple_files', { count: selectedFile?.length })}
                </div>
              )}
            </>
          )}

          {fileRejectionItems}

          {fileError && (
            <span className="text-red mt-6 text-sm">{t('file_too_large')}</span>
          )}

          <input {...getInputProps()} />
        </div>
      </div>

      {error && (
        <div className="text-red relative text-xs">{error.message}</div>
      )}
    </>
  )
}
