import { FC,ChangeEvent, useState } from 'react';

export interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange?: (event: unknown) => void;
  onInput?: (event: unknown) => void;
}

export const TextInput :FC<TextInputProps> = ({ label, placeholder, value, onChange,onInput }) => {
  const [internalValue, setInternalValue] = useState(value);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);

    if (onInput) {
      onInput(newValue);
    }
  };

  const style = {
    color: 'red'
  }

  return (
    <div>
      <label htmlFor="textInput">{label}</label>
      <input
        id="textInput"
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleInputChange}
        onInput={handleInput}
        style={style}
      />
    </div>
  );
};
