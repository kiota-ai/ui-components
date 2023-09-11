/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from './Input'
import { FaTimes } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'

interface SelectProps {
  placeholder: string;
  isClearable?: boolean;
  options: any[]; // Reemplaza 'any' con el tipo de dato correcto para tus opciones
  reference:any;
  error?: any;
  label?: any;
  onSelect?: (selectedOption: any) => void; // Reemplaza 'any' con el tipo de dato correcto para la opción seleccionada
  initialValues?: any | null; // Reemplaza 'any' con el tipo de dato correcto para las opciones iniciales
  reset?: boolean;
  setReset?: (reset: boolean) => void;
  searchKey?: string;
  displayKey?: string;
  required?: boolean;
  noOptionsText?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const Autocomplete:FC<SelectProps> = ({
  placeholder,
  isClearable = true,
  options,
  reference,
  error,
  label,
  onSelect,
  initialValues = null,
  reset,
  setReset,
  searchKey = 'name',
  displayKey = 'name',
  required = false,
  noOptionsText,
  ...inputProps
}) => {

  const { t } = useTranslation()
  const [display, setDisplay] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults]:any = useState([])
  const [selected, setSelected] = useState(initialValues)
  const wrapperRef = useRef(null)

  const handleClickOutside = (event:any) => {
    const { current: wrap } = wrapperRef as any
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false)
    }
  }

  const setItem = (item:any) => {
    setDisplay(false)
    onSelect && onSelect(item)
    setSelected(item)
    setSearch('')
  }

  const filterOptions = () => {
    return (options || []).filter(item => {
      return (item[searchKey] || '').toLowerCase().indexOf((search || '').toLowerCase()) > -1
    })
  }

  const mustReplaceSelectionFromInitialValues = () => {
    // you must use reset and setReset to reset the selection
    if (!initialValues) {
      return false
    }

    if (!selected) {
      return true
    }

    return selected[searchKey] !== initialValues[searchKey]
  }

  const resetSelection = () => {
    setSelected(null)
    onSelect && onSelect(null)
    setSearch('')
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (mustReplaceSelectionFromInitialValues()) {
      setSelected(initialValues)
      onSelect && onSelect(initialValues)
      setSearch('')
    }
  }, [initialValues])

  useEffect(() => {
    if (reset) {
      resetSelection()
      setReset && setReset(false)
    }
  }, [reset])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [selected, isClearable])

  useEffect(() => {
    setSearchResults(search && search !== '' ? filterOptions() : options)
  }, [search, options])

  return (
    <div ref={wrapperRef}>
      <label className="block mb-1 text-left text-xs font-medium text-black flex">
        {label}
        {required && <span className="text-red">&nbsp;*</span>}
        {(selected && isClearable) && (
          <span
            data-tip={t('reset')}
            className={`hover:underline text-main relative -top-[1px]`}
            onClick={e => {
              e.stopPropagation()
              resetSelection()
            }}
          >
            <FaTimes className="cursor-pointer inline-block ml-1" />
          </span>
        )}
      </label>

      <Input
        type="text"
        reference={reference}
        onClick={() => setDisplay(!display)}
        placeholder={placeholder}
        value={(!display && selected ? selected[displayKey] : search) || ''}
        autoComplete="off"
        onChange={(event) => setSearch(event.target.value)}
        className={`w-full | py-3 px-4 mb-5 | text-left text-xs font-normal relative z-10 | rounded-2xl placeholder-gray shadow-focus | cursor-text transition-all duration-200 | outline-none hover:border-main hover:outline-none hover:shadow-inner bg-white cursor-pointer active:outline-none focus:border-main focus:outline-none focus:shadow-focus`}
        {...inputProps}
      />

      <div className="relative w-full">
        {display && (
          <div className={`w-full max-h-52 overflow-y-auto | -mt-4 py-3 px-3 mb-5 | text-left text-xs font-normal absolute z-20 | rounded-2xl placeholder-gray shadow-hover bg-white | cursor-pointer transition-all duration-200 | outline-none hover:border-main hover:outline-none  active:outline-none focus:border-main focus:outline-none focus:shadow-focus`}>
            {searchResults.length > 0 && (
              searchResults.map((value:any, i:any) => (
                <ul key={i} tabIndex={0} onClick={() => setItem(value)}>
                  <li className={`py-1 px-2 font-normal hover:text-main`}>
                    {displayKey ? value[displayKey] : value[searchKey]}
                  </li>
                </ul>
              ))
            )}

            {searchResults.length === 0 && (
              <ul tabIndex={0} onClick={() => setItem('')}>
                <li className="py-1 px-2 font-normal">
                  {noOptionsText || t('no_options')}
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="text-red relative -top-3 left-2 text-xxs">
          {error.message}
        </div>
      )}
    </div>
  )
}
