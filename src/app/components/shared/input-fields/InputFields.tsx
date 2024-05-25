import React, { ChangeEvent, ReactNode, useState } from "react";

interface InputFieldProps {
  css?: string;
  mainCss?: string;
  label?: string;
  placeholder?: string;
  inputType?: string;
  borderColor?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  name?: string;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  css,
  mainCss,
  label,
  placeholder,
  inputType,
  onChange,
  value,
  name,
  disabled,
  endIcon,
  error,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="text-nafcGreyBlack mb-2 text-sm">
          {label}
        </label>
      )}
      <div
        className={`${mainCss} h-full relative border flex items-center rounded-lg overflow-hidden  focus:outline-none `}
      >
        <input
          type={inputType ? inputType : "text"}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`${css} font-light w-full h-10 px-3 py-2 focus:outline-none rounded-md`}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
        {endIcon && endIcon}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default InputField;
