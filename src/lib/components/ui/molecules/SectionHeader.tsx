/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconContainer } from '../atoms/IconContainer'
import Filter from '../../../../assets/images/filter.svg'
import Plus from '../../../../assets/images/plus.svg'
import Upload from '../../../../assets/images/Upload.svg'
import ScrollContainer from 'react-indiana-drag-scroll'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Select } from '../atoms/Select'

interface SectionHeaderProps {
  sectionTitles?: string[];
  sectionKeys?: string[];
  sortItems?: any[];
  setShowFilters: (show: boolean) => void;
  setShowAdd: (show: boolean) => void;
  setShowUpload: (show: boolean) => void;
  section: string;
  sort: string;
  setSection?: (section: string) => void | null;
  setSort: (sort: string) => void;
  showFilters?: boolean;
  showAdd?: boolean;
  showSort?: boolean;
  showUpload?: boolean;
  className?: string;
}


export const SectionHeader: FC<SectionHeaderProps> = ({
  sectionTitles = [],
  sectionKeys = [],
  sortItems = [],
  setShowFilters,
  setShowAdd,
  setShowUpload,
  section,
  sort,
  setSection = null,
  setSort,
  showFilters = false,
  showAdd = false,
  showSort = false,
  showUpload = false,
  className = ''
}) => {
  const { t } = useTranslation()
  const wrapperElement:any = useRef()
  const scrollElement:any = useRef()
  const sectionsWrapperElement:any = useRef()
  const [showRightArrowButton, setShowRightArrowButton] = useState(false)
  const [showLeftArrowButton, setShowLeftArrowButton] = useState(false)
  const [sectionsWrapperWidth, setSectionsWrapperWidth] = useState(0)

  const calculateSectionsWrapperWidth = () => {
    if (!sectionsWrapperElement || !sectionsWrapperElement.current) {
      return 0
    }

    if (!sectionKeys || !sectionKeys.length) {
      return 0
    }

    let totalWidth = 0
    const sections = sectionsWrapperElement.current.querySelectorAll('button')

    for (let i = 0; i < sections.length; i++) {
      totalWidth += sections[i].offsetWidth + 18
    }

    return totalWidth
  }

  const onTabSelect = (idx:number) => {
    setSection && setSection(sectionKeys[idx])
  }

  const onScroll = () => {
    if (scrollElement.current.scrollLeft > 30) {
      setShowLeftArrowButton(true)
    } else {
      setShowLeftArrowButton(false)
    }

    if ((scrollElement.current.offsetWidth - scrollElement.current.scrollLeft) > 30) {
      setShowRightArrowButton(true)
    } else {
      setShowRightArrowButton(false)
    }
  }

  const scrollTo = (direction:string, amount:number) => {
    if (direction === 'left') {
      scrollElement.current.scrollLeft -= amount
    } else {
      scrollElement.current.scrollLeft += amount
    }
  }

  useEffect(() => {
    setSectionsWrapperWidth(calculateSectionsWrapperWidth())
  }, [
    sectionKeys,
    sectionTitles,
    sectionsWrapperElement
  ])

  useEffect(() => {
    if (scrollElement?.current) {
      scrollElement.current.addEventListener('scroll', onScroll)
    }

    return () => {
      if (scrollElement?.current) {
        scrollElement.current.removeEventListener('scroll', onScroll)
      }
    }
  }, [scrollElement])

  useEffect(() => {
    if (wrapperElement?.current) {
      if (sectionsWrapperWidth > wrapperElement.current.offsetWidth) {
        setShowRightArrowButton(true)
      }
    }
  }, [wrapperElement, sectionsWrapperElement, scrollElement])

  return (
    <div className={`flex relative w-full px-4 mt-2 border-b border-border-section-header ${className}`}>
      <div className="flex-1 max-w-full">
        {showRightArrowButton && (
          <div className="flex justify-end items-center h-full top-0 right-0 w-24 absolute bg-gradient-to-l from-white to-transparent z-10">
            <FaChevronRight
              className={`text-main cursor-pointer`}
              onClick={() => scrollTo('right', 50)}
            />
          </div>
        )}

        {showLeftArrowButton && (
          <div className="flex justify-start items-center h-full top-0 left-0 w-24 absolute bg-gradient-to-r from-white to-transparent z-10">
            <FaChevronLeft
              className={`text-main cursor-pointer`}
              onClick={() => scrollTo('left', 50)}
            />
          </div>
        )}

        <div className="flex max-w-full" ref={wrapperElement}>
          <ScrollContainer
            className="cursor-grab active:cursor-grabbing w-full"
            horizontal={true}
            hideScrollbars={true}
            innerRef={scrollElement}
          >
            <div
              ref={sectionsWrapperElement}
              className="min-w-full"
              style={{ width: sectionsWrapperWidth }}
            >
              {sectionTitles.map((title, idx) => (
                <button
                  key={title}
                  onClick={() => onTabSelect(idx)}
                  className={`select-none text-sm mr-4 outline-none focus:outline-none ${section === sectionKeys[idx]
                    ? `text-text-section-header-active-item font-semibold`
                    : 'text-gray font-medium'
                    }`}
                >
                  {title}
                </button>
              ))}
            </div>
          </ScrollContainer>
        </div>
      </div>

      {(showFilters || showAdd || showSort || showUpload) && (
        <div className="flex">
          {showSort && (
            <Select
              isClearable={false}
              placeholder={t('sort_by')}
              sort="true"
              initialValues={[{ id: sort, value: t(`sort_${sort}`) }]}
              items={sortItems}
              onSelect={(e:any) => {
                setSort(String(e[0].id))
              } }          />
          )}
          {showFilters && (
            <span className='inline-block relative -top-1'>
              <IconContainer
                width="8"
                height="8"
                shadow="hover"
                shadowHover="inner"
                iconWidth="4"
                icon={Filter}
                onClick={() => setShowFilters(true)}
              />
            </span>
          )}
          {showAdd && (
            <IconContainer
              width="8"
              height="8"
              shadow="hover"
              shadowHover="inner"
              iconWidth="4"
              icon={Plus}
              onClick={() => setShowAdd(true)}
            />
          )}
          {showUpload && (
            <IconContainer
              width="8"
              height="8"
              shadow="hover"
              shadowHover="inner"
              iconWidth="5"
              icon={Upload}
              onClick={() => setShowUpload(true)}
            />
          )}
        </div>
      )}
    </div>
  )
}
