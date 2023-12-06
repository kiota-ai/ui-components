/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next'
import SelectCurrency from './SelectCurrency'
import { Switch } from './Switch'
import { FC } from 'react';

export interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  reference: React.Ref<HTMLInputElement>;
  error?: any;
  label?: string;
  placeholder?: string;
  type: string;
  maxLength?: number;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  nameInput:any;
  nameSelect:string;
  icon:any;
  setValue:any;
  watch:any;
  switchOption:any;
  switchTooltip:any;
  switchText:any;
  switchValue:any;
  setSwitchValue:any;
}

export const CurrencyInput:FC<CurrencyInputProps> = ({
  reference,
  nameInput,
  nameSelect,
  error,
  label,
  placeholder,
  required = false,
  setValue,
  watch,
  switchOption,
  switchTooltip,
  switchText,
  switchValue,
  setSwitchValue,
  ...inputProps
}) => {
  const { t } = useTranslation()

  const unitOptions = [{ id: 'k', value: 'K' }, { id: 'mm', value: t('MM') }]

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={label}
          className={`block mb-1 text-left text-xs font-medium flex justify-between mb-4`}
        >
          <div>
            {label}&nbsp;
            {required && (
              <span className="text-red inline-block mx-1">*</span>
            )}
          </div>
          {switchOption && (
            <div>
              <Switch
                tooltip={switchTooltip}
                checked={switchValue}
                onChange={(checked) => {
                  setSwitchValue(checked);
                } }
                text={switchText} classContentName={''}              />
            </div>
          )}
        </label>
      )}

      <div className='flex items-start'>
        <div className={`${watch(nameSelect) ? 'w-10/12' : 'w-7/12'}`}>
          <input
            name={nameInput}
            {...reference}
            {...inputProps}
            type={'number'}
            step="any"
            placeholder={placeholder}
            required={required}
            className={`shadow-soft-white border border-gray-lines focus:border-main bg-input w-full py-3 px-7 mb-2 sm:mb-5 relative z-10 text-left text-xs font-normal rounded-l-2xl placeholder-gray cursor-pointer transition-all duration-200 outline-none hover:border-main hover:outline-none hover:shadow-inner focus:outline-none focus:shadow-focus active:outline-none`}
          />
        </div>
        <div className={`${watch(nameSelect) ? 'w-2/12' : 'w-5/12'}`}>

          <SelectCurrency
            name={nameSelect}
            items={unitOptions}
            multiSelect={false}
            initialValues={unitOptions.filter(i => watch(nameSelect) && watch(nameSelect) === i.id) || []}
            onSelect={(selection: { id: any; }[]) => setValue(nameSelect, selection[0].id)}
          />
        </div>
      </div>

      {error && (
        <div className="text-red relative left-2 -top-3 text-xxs text-left">
          {error.message}
        </div>
      )}
    </div>
  )
}
