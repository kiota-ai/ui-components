import { FC } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TagListDotsProps {
  tags: any[];
  className:string;
}

export const TagListDots:FC<TagListDotsProps> = ({ tags, className = '' }) => {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <div
      className={className}
      style={{
        height: 5,
        lineHeight: 0
      }}
    >
      {tags.map(tag => (
        <span
          data-tip={tag.name}
          key={tag._id}
          className="inline-block rounded-full"
          style={{
            backgroundColor: tag.color,
            height: 5,
            width: 5,
            marginRight: 2
          }}
        />
      ))}
    </div>
  )
}
