/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from './Select'
import React from 'react'

interface PaginationProps {
  showRowsPerPage?: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  pages: number;
  maxPaginationNumbers: number;
  paginateOptions?: number[];
}


export const Pagination: FC<PaginationProps> = ({
  showRowsPerPage = false,
  currentPage,
  setCurrentPage,
  perPage,
  setPerPage,
  pages,
  maxPaginationNumbers,
  paginateOptions = [10, 25, 50]
}) => {
  const { t } = useTranslation()
  const [paginationNumbers, setPaginationNumbers] = useState([1, 2, 3, 4, 5])

  const getInitial = (length:number) => {
    if (currentPage - Math.floor(length / 2) <= 0 || pages < length) return 0
    else if (currentPage + Math.floor(length / 2) >= pages) { return pages - length } else return currentPage - Math.floor(length / 2)
  }

  const prevNextPage = (side:any) => {
    if (side === 'next' && currentPage < pages - 1) {
      setCurrentPage(currentPage + 1)
    } else if (side === 'prev' && currentPage >= 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    const maxPag = maxPaginationNumbers || 5
    const length = pages < maxPag ? pages : maxPag

    const initial = getInitial(length) + 1

    const res:number[] = []
    for (let i = initial; i < initial + length; i++) {
      res.push(i)
    }

    setPaginationNumbers(res)
    return () => {
      setPaginationNumbers([])
    }
  }, [pages, currentPage])

  return (
    <div className="relative top-0 left-0 pb-3 pt-6 flex items-center justify-between rounded-b-2xl lg:static w-auto">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          disabled={currentPage === 0}
          onClick={() => prevNextPage('prev')}
          className={`
                bg-transparence-blue hover:shadow-inner mr-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}
              `}
        >
          <span>{t('previous')}</span>
        </button>

        <button
          disabled={currentPage === pages - 1}
          onClick={() => prevNextPage('next')}
          className={`
            bg-transparence-blue hover:shadow-inner ml-4  
            inline-flex items-center p-2 rounded-xl text-main
            text-sm font-medium cursor-pointer outline-none focus:outline-none
            ${(currentPage === pages - 1) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <span>{t('next')}</span>
        </button>
      </div>

      <div className={`hidden sm:flex-1 sm:flex sm:items-center ${showRowsPerPage ? 'sm:justify-between' : 'sm:justify-end'}`}>
        {showRowsPerPage && (
          <div className="flex justify-center items-center">
            <Select
              items={paginateOptions.map((option:any) => ({ id: option, value: option }))}
              initialValues={[{ id: perPage, value: perPage }]}
              onSelect={setPerPage}
              isClearable={false}
              className="mt-4"
            />
          </div>
        )}

        <nav className="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
          <button
            disabled={currentPage === 0}
            onClick={() => prevNextPage('prev')}
            className={`
                bg-transparence-blue hover:shadow-inner mr-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}
              `}
          >
            <span>{t('previous')}</span>
          </button>

          {paginationNumbers.map((pageNumber) => (
            <span key={pageNumber}>
              {currentPage + 1 === pageNumber && (
                <button className={`mx-1 px-4 py-2 text-sm font-medium rounded-xl shadow-inner hover:shadow-inner bg-main text-white`}>
                  {pageNumber}
                </button>
              )}

              {currentPage + 1 !== pageNumber && (
                <button
                  onClick={() => setCurrentPage(pageNumber - 1)}
                  className={`mx-1 px-4 py-2 text-sm font-medium text-mainrounded-xl bg-transparence-blue hover:text-mainhover:shadow-inner`}
                >
                  {pageNumber}
                </button>
              )}
            </span>
          ))}

          <button
            disabled={currentPage === pages - 1}
            onClick={() => prevNextPage('next')}
            className={`
                bg-transparence-blue hover:shadow-inner ml-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${(currentPage === pages - 1) ? 'opacity-50 cursor-not-allowed' : ''}
              `} >
            <span>{t('next')}</span>
          </button>

        </nav>
      </div>
    </div>
  )
}
