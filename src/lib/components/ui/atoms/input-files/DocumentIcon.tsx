/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FaFile, FaFileImage,
  FaLink,
  FaRegFilePdf,
  FaVideo,
} from 'react-icons/fa'
import {
  AiOutlineFileExcel,
  AiOutlineFilePpt,
  AiOutlineFileWord
} from 'react-icons/ai'
import {
  VscJson
} from 'react-icons/vsc'

export const DocumentIcon = ({
  documentName = '',
  size = 55,
  link = false
}) => {
  const nameParts = documentName.split('.')
  const extension:any = nameParts[nameParts.length - 1]

  const icons:any = {
    default: { icon: <FaFile />, colorClass: `bg-main` },
    pdf: { icon: <FaRegFilePdf />, colorClass: 'bg-rose-600' },
    PDF: { icon: <FaRegFilePdf />, colorClass: 'bg-rose-600' },
    docx: { icon: <AiOutlineFileWord />, colorClass: 'bg-indigo-700' },
    doc: { icon: <AiOutlineFileWord />, colorClass: 'bg-indigo-700' },
    json: { icon: <VscJson />, colorClass: 'bg-violet-700' },
    ppt: { icon: <AiOutlineFilePpt />, colorClass: 'bg-yellow-400' },
    pptx: { icon: <AiOutlineFilePpt />, colorClass: 'bg-yellow-400' },
    xls: { icon: <AiOutlineFileExcel />, colorClass: 'bg-emerald-400' },
    xlsx: { icon: <AiOutlineFileExcel />, colorClass: 'bg-emerald-400' },
    mp4: { icon: <FaVideo />, colorClass: 'bg-fuchsia-400' },
    avi: { icon: <FaVideo />, colorClass: 'bg-fuchsia-400' },
    mov: { icon: <FaVideo />, colorClass: 'bg-fuchsia-400' },
    png: { icon: <FaFileImage />, colorClass: 'bg-teal-400' },
    jpg: { icon: <FaFileImage />, colorClass: 'bg-teal-400' },
    jpeg: { icon: <FaFileImage />, colorClass: 'bg-teal-400' },
    gif: { icon: <FaFileImage />, colorClass: 'bg-teal-400' },
    bmp: { icon: <FaFileImage />, colorClass: 'bg-teal-400' },
    tiff: { icon: <FaFileImage />, colorClass: 'bg-teal-400' },
    link: { icon: <FaLink />, colorClass: 'bg-gray' }
  }

  const icon:any = link ? icons.link : icons[extension] || icons.default

  return (
    <span
      style={{ width: size, height: size, padding: 3, fontSize: size * 0.60 }}
      className={`rounded-full bg-main text-white inline-block flex justify-center items-center ${icon.colorClass}`}>
      {icon.icon}
    </span>
  )
}
