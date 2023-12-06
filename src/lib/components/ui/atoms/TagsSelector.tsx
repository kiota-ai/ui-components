/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCheckCircle, FaCircle } from 'react-icons/fa'
import { Input } from './Input'

export interface Props {
  tags: any
  setSelectedTags:any
  selectedTags:any
}



export const TagsSelector:FC<Props> = ({
  tags,
  setSelectedTags,
  selectedTags
}) => {
  const { t } = useTranslation()
  const [filteredTags, setFilteredTags] = useState(tags || [])

  const hexToRgb = (hex:string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
      : null
  }

  const saturateColor = (color: string, percent: number) => {
    const rgb = hexToRgb(color)
  
    if (!rgb) {
      return color
    }
  
    return `rgb(${Math.round(rgb.r + (255 - rgb.r) * percent)}, ${Math.round(rgb.g + (255 - rgb.g) * percent)}, ${Math.round(rgb.b + (255 - rgb.b) * percent)})`
  }
  const selectTag = (tagId: any) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((t: any) => t !== tagId))
    } else {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  const isTagSelected = (tagId: any) => {
    return selectedTags.includes(tagId)
  }

  const onSearch = (e: any) => {
    const search = e.target.value
    setFilteredTags(tags.filter((tag: { name: string }) => {
      return tag.name.toLowerCase().includes(search.toLowerCase())
    }))
  }

  useEffect(() => {
    if (tags && Array.isArray(tags)) {
      setFilteredTags(tags)
    }
  }, [tags])

  return (
    <>
      <Input
        placeholder={t('search')}
        onChange={onSearch} reference={null} type={'text'}      />
      <div className="mt-2 flex flex-wrap max-h-52 overflow-y-scroll">
        {filteredTags.map((tag: { _id: Key | null | undefined; color: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Iterable<ReactNode> | null | undefined }) => (
          <div
            key={tag._id}
            onClick={() => selectTag(tag._id)}
            className={`inline-block mr-2 mb-4 rounded-2xl py-1 px-2 cursor-pointer relative font-semibold text-xs ${isTagSelected(tag._id) ? 'shadow-inner' : ''}`}
            style={{
              backgroundColor: tag.color,
              color: saturateColor(tag.color, 0.7)
            }}
          >
            {tag.name}
            {isTagSelected(tag._id) && <FaCheckCircle className="inline-block ml-1" />}
            {!isTagSelected(tag._id) && <FaCircle className="inline-block ml-1" />}
          </div>
        ))}
      </div>
    </>
  )
}
