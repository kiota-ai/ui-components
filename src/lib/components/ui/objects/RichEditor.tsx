/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import QuillToolbar, { formats } from './RichEditorToolbar'
import { FC } from 'react';

interface RichEditorProps {
  label: string;
  id: string;
  name: any;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  reference?: any;
  error?: any;
  className?: string;
  toolbarClassName?: string;
}

export const RichEditor: FC<RichEditorProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  disabled,
  reference,
  error,
  className,
  toolbarClassName=""
}) => {
  const _onChange = (source:any, editor:any) => {
    onChange && source === 'user' && onChange(editor.getHTML())
  }

  return (
    <>
      {label && (
        <label htmlFor={id} className="block mb-1 text-left text-xs font-medium">
          {label}
        </label>
      )}
      <QuillToolbar toolbarClassName={toolbarClassName} />
      <ReactQuill
        modules={{ toolbar: `.${toolbarClassName}` }}
        ref={reference}
        id={id}
        value={value}
        defaultValue={value}
        theme="snow"
        onChange={_onChange}
        placeholder={placeholder}
        readOnly={disabled}
        className={className}
        formats={formats}
      />

      {error && (
        <div className="text-red text-xxs">
          {error.message}
        </div>
      )}
    </>

  )
}
