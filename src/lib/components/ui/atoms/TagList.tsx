/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next'
import { FC } from 'react';

export interface TagListProps {
  tags: any[];
  showEmptyState: boolean;
}

export const TagList:FC<TagListProps> = ({ tags, showEmptyState = false }) => {
  const { t } = useTranslation()

  if ((!tags || !tags.length) && !showEmptyState) {
    return null
  }

  const hexToRgb = (hex:any) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
      : null
  }

  const saturateColor = (color:any, percent:any) => {
    const rgb = hexToRgb(color)
  
    if (!rgb) {
      return color
    }
  
    return `rgb(${Math.round(rgb.r + (255 - rgb.r) * percent)}, ${Math.round(rgb.g + (255 - rgb.g) * percent)}, ${Math.round(rgb.b + (255 - rgb.b) * percent)})`
  }

  return (
    <>
      {tags.map((tag) => (
        <span
          key={tag._id}
          className="inline-block mr-2 rounded-2xl py-0.5 px-2 relative font-semibold text-xxxs"
          style={{
            backgroundColor: tag.color,
            color: saturateColor(tag.color, 0.7)
          }}
        >
          {tag.name}
        </span>
      ))}

      {(!tags || tags.length === 0) && (
        <span className="inline-block mr-3 mt-1 font-semibold text-xxs px-2 py-0.5 text-gray-300">
          {t('no_tags')}
        </span>
      )}
    </>
  )
}
