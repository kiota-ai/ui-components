/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { ButtonSecondary } from '../atoms/ButtonSecondary';
import { ButtonDanger } from '../atoms/ButtonDanger';

interface DataGridProps {
  headers?: any[];
  data?: any[];
  actions?: any[];
  compact?: boolean;
  bordered?: boolean;
  stickyHeader?: boolean;
  stickyActions?: boolean;
  wrapperClassName?: string;
  actionsHeaderClassName?: string;
}

export const DataGrid: FC<DataGridProps> = ({
  headers = [],
  data = [],
  actions = [],
  compact = false,
  bordered = false,
  stickyHeader = true,
  stickyActions = true,
  wrapperClassName = '',
  actionsHeaderClassName = ''
}) => {
  const columnSizeClass = compact ? 'px-3 py-2' : 'px-6 py-4'
  const [actionsWidth, setActionsWidth] = useState(100)
  const getActionsColumnWidth = useCallback((tableRef:any) => {
    if (!tableRef) {
      return
    }

    const actionWrappers = tableRef.querySelectorAll('.data-grid-actions')
    let maxWidth = 0

    actionWrappers.forEach((wrapper:any) => {
      const width = wrapper.getBoundingClientRect().width
      if (width > maxWidth) {
        maxWidth = width
      }
    })

    setActionsWidth(maxWidth)
  }, [])
  const [hasHeaderShadow, setHasHeaderShadow] = useState(false)
  const [hasActionCellShadow, setHasActionCellShadow] = useState(false)
  const headerRowRef:any = useRef(null)
  const wrapperRef:any = useRef(null)

  const headerShadowObserver = new IntersectionObserver((entries) => {
    setHasHeaderShadow(!entries[0].isIntersecting)
  })

  useEffect(() => {
    headerShadowObserver.disconnect()

    if (headerRowRef.current) {
      headerShadowObserver.observe(headerRowRef.current)
    }

    return () => {
      headerShadowObserver.disconnect()
    }
  }, [headerRowRef.current])

  useEffect(() => {
    const listener = () => {
      if (headerRowRef.current) {
        const maxScrollLeft = wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth - 5
        setHasActionCellShadow(wrapperRef.current.scrollLeft < maxScrollLeft)
      }
    }

    wrapperRef.current.addEventListener('scroll', listener)
    listener()
    return () => { }
  }, [wrapperRef])

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block w-full">
          <div className={`overflow-auto ${wrapperClassName}`} ref={wrapperRef}>
            <table
              style={{ borderSpacing: 0 }}
              className="relative min-w-full"
              ref={getActionsColumnWidth}
            >
              <thead className="bg-white border-b">
                <tr ref={headerRowRef}>
                  {headers.filter((header:any) => header.show ? header.show(header) : true).map((header) => (
                    <th
                      key={header.key}
                      scope="col"
                      className={
                        `${columnSizeClass} 
                        ${stickyHeader ? 'sticky top-0' : ''}
                        ${header.columnClassName} 
                        ${header.headerClassName ? header.headerClassName : `text-main text-sm font-medium text-left bg-white`} 
                        ${bordered ? 'border border-gray-lines' : ''}
                        ${hasHeaderShadow ? 'shadow-basic' : ''}`
                      }
                    >
                      {header.title}
                    </th>
                  ))}
                  {!!(actions && actions.length) && (
                    <th
                      scope="col"
                      style={{ width: actionsWidth }}
                      className={
                        `${columnSizeClass} 
                        ${stickyActions ? 'sticky top-0 right-0' : ''} 
                        bg-white relative z-10 
                        ${hasHeaderShadow ? 'shadow-basic' : ''}
                        ${bordered ? 'border-l border-b border-gray-lines' : ''}
                        ${actionsHeaderClassName}`
                      }
                    >
                      &nbsp;
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    {headers.filter(header => header.show ? header.show(header) : true).map((header) => (
                      <td
                        key={header.key}
                        className={`${columnSizeClass} 
                        whitespace-nowrap text-sm font-medium 
                        ${header.columnClassName} 
                        ${row.rowClassName} 
                        ${bordered ? 'border border-gray-lines' : ''}`}
                      >
                        {header.render
                          ? header.render(header.key, row)
                          : row[header.key]}
                      </td>
                    ))}

                    {!!(actions && actions.length) && (
                      <td
                        style={{ width: actionsWidth }}
                        className={
                          `${columnSizeClass} 
                          bg-white whitespace-nowrap text-sm font-medium 
                          ${stickyActions ? 'sticky top-0 right-0' : ''} 
                          ${bordered ? 'border border-gray-lines' : ''} 
                          ${hasActionCellShadow ? 'shadow-basic' : ''}`
                        }
                      >
                        <div className="flex flex-row justify-end items-end data-grid-actions">
                          {actions
                            .filter((action) => {
                              return action.show ? action.show(row) : true
                            })
                            .map((action) => (
                              <div
                                key={action.id}
                                className="mr-1"
                                data-tip={action.tip}
                              >
                                {action.id === 'delete' ? <ButtonDanger
                                  {...action.buttonProps}
                                  onClick={() => {
                                    action.onClick && action.onClick(row)
                                  }}
                                /> : <ButtonSecondary
                                  {...action.buttonProps}
                                  onClick={() => {
                                    action.onClick && action.onClick(row)
                                  }}
                                />}
                              </div>
                            ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
