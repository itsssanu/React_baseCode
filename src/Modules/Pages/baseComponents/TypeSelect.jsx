import React from 'react';
import { Select } from 'antd';

const TypeSelect = ({
  name = '',
  disabled = false,
  placeholder = '',
  options = [],
  className = '',
  value = '',
  type = 'select',
  popupClassName,
  onChange = () => { }
}) => {
  return (
    <div className=" w-full ant-select-selector mr-2 border border-[#BFBFBF] bg-white rounded-xl h-[49px] p-2 flex items-center">
      <Select
        className={`w-full border-none ${className}`}
        variant="borderless"
        // key={key}
        type={type}
        // popupClassName={popupClassName}
        // filterOption={filterOption}
        showSearch
        disabled={disabled}
        name={name}
        options={options}
        placeholder={placeholder}
        value={value || null}
        onChange={onChange ? onChange : () => null}
        aria-label={name || placeholder}
        autofill="off"
      />
    </div>
  );
};

export default TypeSelect;
