/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react'
import onClickOutside from 'react-onclickoutside'
import ArrowDown from '../../../../assets/images/arrow_black_down.svg'
import ArrowUp from '../../../../assets/images/arrow_black_up.svg'
import Tick from '../../../../assets/images/tick.svg'
import Sort from '../../../../assets/images/sort_arrows.svg'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'

export interface SelectCurrencyProps {
  placeholder?: any;
  name?: any;
  reset?: any;
  setReset?: any;
  items?: any;
  multiSelect?: any;
  error?: any;
  initialValues?: any;
  onSelect?: any;
  sort?: any;
  className?: any;
  disabled?: any;
  noOptionsText?: any;
}


const SelectCurrency: FC<SelectCurrencyProps> = ({
  name = '',
  placeholder,
  reset = false,
  setReset,
  items = [],
  multiSelect = false,
  error,
  initialValues = [],
  onSelect,
  sort,
  className = '',
  disabled = false,
  noOptionsText
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<Array<any>>(initialValues);
  console.log(name)
  const handleOnClick = (item: any) => {
    let selectedOptions: any[] = [];

    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        selectedOptions = [item];
      } else if (multiSelect) {
        selectedOptions = [...selection, item];
      }
    } else {
      let selectionAfterRemoval = selection;

      if (selectionAfterRemoval.length === 1 && !multiSelect) {
        return;
      }

      selectionAfterRemoval = selectionAfterRemoval.filter((current) => current.id !== item.id);
      selectedOptions = [...selectionAfterRemoval];
    }

    setSelection(selectedOptions);

    if (onSelect) {
      onSelect(selectedOptions);
    }

    if (!multiSelect) {
      setOpen(!open);
    }
  };

  const isItemInSelection = (item: any) => selection.some((current) => current.id === item.id);

  const resetSelection = () => {
    setSelection([]);
    onSelect([]);
  };

  const mustReplaceSelectionFromInitialValues = () => {
    // Debes usar reset y setReset para restablecer la selección
    if (initialValues.length === 0) {
      return false;
    }

    if (selection.length !== initialValues.length) {
      return true;
    } else {
      for (let i = 0; i < selection.length; i++) {
        if (selection[i].id !== initialValues[i].id) {
          return true;
        }
      }
    }

    return false;
  };

  const getPlaceholder = () => {
    if (placeholder && placeholder !== '') {
      return <span className="text-placeholder-gray">{placeholder}</span>;
    }

    return (
      <span className="text-placeholder-gray">
        {t(multiSelect ? 'select_multi_default_placeholder' : 'select_default_placeholder')}
      </span>
    );
  };

  useEffect(() => {
    if (reset) {
      resetSelection();
      setReset && setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [selection]);

  useEffect(() => {
    if (mustReplaceSelectionFromInitialValues()) {
      setSelection(initialValues);
    }
  }, [initialValues]);

  return (
    <div className={className}>
      <div
        className={'mb-2 sm:mb-5 sm:w-auto outline:none focus:outline-none'}
        onClick={() => !disabled && setOpen(!open)}
      >
        <div
          className={
            `border border-gray-lines bg-white w-full py-2 sm:py-3 px-7 relative z-1s0 text-left text-xs 
            font-normal rounded-r-2xl placeholder-gray ${!disabled && `shadow-soft-white 
            hover:border-border-buttons-secondary hover:outline-none hover:shadow-focus focus:outline-none 
            focus:shadow-focus active:outline-none active:shadow-focus`} cursor-pointer transition-all  
            duration-500 outline-none ${disabled && 'shadow-inner'} ${open && 'shadow-inner'}`
          }
        >
          <div>
            {open && (
              <>
                {sort && (
                  <>
                    <div className="flex justify-between items-center bg-white">
                      <div className="flex">
                        <img src={Sort} alt="Arrow down" className="w-4 mr-1" />
                        <p className='text-xs hidden sm:block'>
                          {multiSelect ? getPlaceholder() : selection.length ? selection[0].value : getPlaceholder()}
                        </p>
                      </div>
                      <img src={ArrowUp} alt="Arrow up" className="pl-8" />
                    </div>
                  </>
                )}

                {!sort && (
                  <>
                    <div className="flex justify-between items-center bg-white">
                      <div className="flex text-xs">
                        {!multiSelect && selection.length > 0 && selection[0].image && (
                          <span className="mr-2">{selection[0].image}</span>
                        )}
                        <span>
                          {multiSelect ? getPlaceholder() : selection.length ? selection[0].value : getPlaceholder()}
                        </span>
                      </div>
                      <img src={ArrowUp} alt="Arrow up" className="pl-8" />
                    </div>
                  </>
                )}
              </>
            )}

            {!open && (
              <div className="flex justify-between bg-white">
                {sort
                  ? (
                    <>
                      <div className="flex">
                        <img src={Sort} alt="Arrow down" className="w-4 mr-1" />
                        <p className="text-xs hidden sm:block">
                          {multiSelect ? getPlaceholder() : selection.length ? selection[0].value : getPlaceholder()}
                        </p>
                      </div>
                      <img src={ArrowDown} alt="Arrow down" className="pl-8" />
                    </>
                  )
                  : (
                    <>
                      <div className="flex text-xs bg-white">
                        <span>
                          {multiSelect ? getPlaceholder() : selection.length ? selection[0].value : getPlaceholder()}
                        </span>
                      </div>

                      <img src={ArrowDown} alt="Arrow down" className="pl-8" />
                    </>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative w-full bg-white">
        {open && (
          <ul
            className={
              `max-h-60 overflow-y-auto bg-white w-full 
              border border-gray-lines -mt-4 mb-4 py-2 sm:py-3 px-4 absolute z-20 
              text-left text-xs font-normal rounded-xl placeholder-gray shadow-soft-white 
              cursor-pointer transition-all duration-200 outline-none hover:outline-none 
              focus:outline-none focus:shadow-focus active:outline-none shadow-hover`
            }
          >
            {!items.length && (
              <li className="py-1 px-3">
                <span className="text-gray">{noOptionsText || t('no_options')}</span>
              </li>
            )}

            {items.map((item:any) => (
              <li
                key={item.id}
                className={
                  `py-1 hover:text-main 
                  ${item.disabled ? 'bg-white' : ''} 
                  ${isItemInSelection(item) ? 'text-main' : ''}`
                }
              >
                {item.disabled && <span className="text-gray">{item.value}</span>}
                {!item.disabled && (
                  <button
                    type="button"
                    onClick={() => (item.disabled ? null : handleOnClick(item))}
                    className="w-full bg-white flex items-center gap-3 text-left outline:none focus:outline-none"
                  >
                    <span className='w-2'>
                      {isItemInSelection(item) && (
                        <img src={Tick} alt="Tick icon" />
                      )}
                    </span>
                    <div className="flex">
                      {item.image && <span className="mr-2">{item.image}</span>}
                      <span className='text-black'>{item.value}</span>
                    </div>
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <div className="text-red relative -top-3 left-2 text-xxs">
          {error.message}
        </div>
      )}
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: ({ props }: any) => {
    const index:any = 'handleClickOutside' + props.name;
    SelectCurrency[index as keyof typeof SelectCurrency]
  }
};

export default onClickOutside(SelectCurrency as any, clickOutsideConfig) as any